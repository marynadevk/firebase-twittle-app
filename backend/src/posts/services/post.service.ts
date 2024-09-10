import { Inject, Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { app } from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { PostRepository } from '../repositories/post.repository';
import { PostDto } from '../dtos/post.dto';
import { UserService } from 'src/user/services/user.service';
import { CommentsService } from 'src/comments/services/comments.service';

export interface FirestoreDoc extends FirebaseFirestore.QueryDocumentSnapshot {}
@Injectable()
export class PostService {
  private db: Firestore;
  private auth: Auth;

  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    @Inject() private postRepository: PostRepository,
    @Inject() private commentsService: CommentsService,
    @Inject() private userService: UserService,
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
      comments: 0,
      ...newPost,
      createdAt: newPost.createdAt.toDate(),
    };
  }

  async getPostById(id: string): Promise<PostDto> {
    const post = await this.postRepository.getPostById(id);
    if (!post) {
      throw new Error('Post not found!!!');
    }
    const author = await this.userService.getUser(post.authorId);
    const commentsAmount =
      await this.commentsService.getCommentsAmountByPostId(id);
    return {
      title: post.title,
      text: post.text,
      likes: post.likes,
      dislikes: post.dislikes,
      authorId: post.authorId,
      author,
      createdAt: post.createdAt.toDate(),
      id,
      comments: commentsAmount,
    };
  }

  async getPosts(
    size: number,
    userId?: string,
    lastDoc?: string,
  ): Promise<{ posts: PostDto[]; lastDoc: FirestoreDoc }> {
    let lastDocSnapshot: FirestoreDoc | undefined;
    if (lastDoc) {
      lastDocSnapshot = await this.convertStringToDocSnapshot(lastDoc);
    }
    const { posts, lastDoc: newLastDoc } = await this.postRepository.getPosts(
      size,
      userId,
      lastDocSnapshot,
    );
    const postsData = posts.map(async (post) => {
      const data = post.data();
      const author = await this.userService.getUser(data.authorId);
      const commentsAmount =
        await this.commentsService.getCommentsAmountByPostId(post.id);
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
        author,
        comments: commentsAmount,
      };
    });

    return { posts: await Promise.all(postsData), lastDoc: newLastDoc.id };
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

    this.postRepository.deletePost(id);
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

  async convertStringToDocSnapshot(lastDoc: string): Promise<FirestoreDoc> {
    const posts = this.db.collection('posts').doc(lastDoc);
    const lastDocSnap = await posts.get();
    return lastDocSnap as FirestoreDoc;
  }

  async deletePostsByAuthorId(userId: string) {
    return this.postRepository.deletePostsByAuthorId(userId);
  }
}
