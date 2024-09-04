import { Inject, Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';

import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { app } from 'firebase-admin';

import { Auth } from 'firebase-admin/auth';
import { PostRepository } from '../repositories/post.repository';
import { PostDto } from '../dtos/post.dto';

@Injectable()
export class PostService {
  private db: Firestore;
  private auth: Auth;

  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    @Inject() private postRepository: PostRepository,
  ) {
    this.db = firebaseApp.firestore();
    this.auth = firebaseApp.auth();
  }

  async create(request: PostDto, user: UserInfoDto): Promise<PostDto> {
    const newPost = {
      authorId: user.uid,
      title: request.title,
      image: request.image || '',
      imageName: request.imageName || '',
      text: request.text,
      createdAt: Timestamp.fromDate(new Date()),
      likes: [],
      dislikes: [],
    };
    const id = await this.postRepository.createPost(newPost);

    const author = {
      name: user.fullName,
      photoUrl: user.avatarUrl,
      id: user.uid,
    };

    return {
      id,
      author,
      ...newPost,
      createdAt: newPost.createdAt.toDate(),
    };
  }

  async getPosts(page: number, size: number): Promise<PostDto[]> {
    const authors = [];
    const posts = await this.postRepository.getPosts(page, size);
    const postsData = posts.map((post) => {
      const data = post.data();
      authors.push({ uid: data.authorId });
      return {
        id: post.id,
        authorId: data.authorId,
        title: data.title,
        image: data.image,
        imageName: data.imageName,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        likes: data.likes,
        dislikes: data.dislikes,
        author: { id: '', name: '', photoUrl: '' },
      };
    });

    const result = await this.auth.getUsers(authors);
    postsData.forEach((post) => {
      const author = result.users.filter(
        (user) => user.uid === post.authorId,
      )[0];
      if (author) {
        post.author = {
          name: author.displayName,
          photoUrl: author.photoURL,
          id: author.uid,
        };
      }
    });

    return postsData;
  }

  async getUsersPosts(
    userId: string,
    page: number,
    size: number,
  ): Promise<PostDto[]> {
    const authors = [];
    const posts = await this.postRepository.getUsersPosts(userId, page, size);
    const postsData = posts.map((post) => {
      const data = post.data();
      authors.push({ uid: data.authorId });
      return {
        id: post.id,
        authorId: data.authorId,
        title: data.title,
        image: data.image,
        imageName: data.imageName,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        likes: data.likes,
        dislikes: data.dislikes,
        author: { id: '', name: '', photoUrl: '' },
      };
    });

    const result = await this.auth.getUsers(authors);
    postsData.forEach((post) => {
      const author = result.users.filter(
        (user) => user.uid === post.authorId,
      )[0];
      if (author) {
        post.author = {
          name: author.displayName,
          photoUrl: author.photoURL,
          id: author.uid,
        };
      }
    });

    return postsData;
  }

  async updatePost(id: string, input: PostDto, user: UserInfoDto) {
    if (input.authorId !== user.uid) {
      throw new Error('You are not the author of this post');
    }
    return await this.postRepository.updatePost(id, input);
  }

  async deletePost(id: string, user: UserInfoDto) {
    const post = await this.postRepository.getPostById(id);
    if (post.authorId !== user.uid) {
      throw new Error('You are not the author of this post');
    }
    return this.postRepository.deletePost(id);
  }

  async likePost(postId: string, userId: string) {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      post.dislikes = post.dislikes.filter((id: string) => id !== userId);
    } else {
      post.likes = post.likes.filter((id: string) => id !== userId);
    }
    await this.postRepository.updatePostLikes(
      postId,
      post.likes,
      post.dislikes,
    );
    return post;
  }

  async dislikePost(postId: string, userId: string) {
    const post = await this.postRepository.getPostById(postId);
    if (!post) {
      throw new Error('Post not found');
    }

    if (post.dislikes.includes(userId)) {
      post.dislikes = post.dislikes.filter((id: string) => id !== userId) || [];
    } else {
      post.likes = post.likes.filter((id: string) => id !== userId) || [];
      post.dislikes.push(userId);
    }
    await this.postRepository.updatePostLikes(
      postId,
      post.likes,
      post.dislikes,
    );
    return post;
  }
}
