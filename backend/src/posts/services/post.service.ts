import { Inject, Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { app } from 'firebase-admin';
import { ResponsePostDto } from '../dtos/response-post.dto';

@Injectable()
export class PostService {
  private db: Firestore;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
  }
  async create(request: CreatePostDto, user: UserInfoDto) {
    const postCollection = this.db.collection('posts');
    const newPost = await postCollection.add({
      authorId: user.uid,
      title: request.title,
      image: request.image || '',
      imageName: request.imageName || '',
      text: request.text,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
      likes: [],
      dislikes: [],
    });
    return newPost;
  }

  async getPosts(): Promise<ResponsePostDto[]> {
    const postCollection = this.db.collection('posts');
    const posts = await postCollection.get();
    const postsData = posts.docs.map((post) => {
      const data = post.data();
      return {
        id: post.id,
        authorId: data.authorId,
        title: data.title,
        image: data.image,
        imageName: data.imageName,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        likes: data.likes,
        dislikes: data.dislikes,
      };
    });
    return postsData;
  }

  async getUsersPosts(userId: string): Promise<ResponsePostDto[]> {
    const postCollection = this.db.collection('posts');
    const posts = await postCollection.where('authorId', '==', userId).get();
    const postsData = posts.docs.map((post) => {
      const data = post.data();
      return {
        id: post.id,
        authorId: data.authorId,
        title: data.title,
        image: data.image,
        imageName: data.imageName,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
        likes: data.likes,
        dislikes: data.dislikes,
      };
    });
    return postsData;
  }

  async updatePost(id: string, input: CreatePostDto, user: UserInfoDto) {
    const postCollection = this.db.collection('posts');
    const post = await postCollection.doc(id).get();
    if (post.exists) {
      const data = post.data();
      let updatedPost;
      if (data.authorId === user.uid) {
        updatedPost = await postCollection.doc(id).update({
          title: input.title,
          image: input.image || data.image,
          imageName: input.imageName || data.imageName,
          text: input.text,
          updatedAt: Timestamp.fromDate(new Date()),
        });
        return updatedPost;
      }
    } else {
      return 'Post not found';
    }
  }

  async deletePost(id: string, user: UserInfoDto) {
    const postCollection = this.db.collection('posts');
    const post = await postCollection.doc(id).get();
    if (post.exists) {
      const data = post.data();
      if (data.authorId === user.uid) {
        await postCollection.doc(id).delete();
        return true;
      } else {
        return 'You are not the author of this post';
      }
    } else {
      return 'Post not found';
    }
  }

  async likePost(postId: string, userId: string) {
    const postCollection = this.db.collection('posts');
    const post = await postCollection.doc(postId).get();
    let updatedPost;
    if (post.exists) {
      const data = post.data();
      if (!data.likes.includes(userId)) {
        data.likes.push(userId);
        data.dislikes = data.dislikes.filter((id: string) => id !== userId);
        updatedPost = await postCollection.doc(postId).update({
          likes: data.likes,
          dislikes: data.dislikes,
        });
      } else {
        data.likes = data.likes.filter((id: string) => id !== userId);
        updatedPost = await postCollection.doc(postId).update({
          likes: data.likes,
        });
      }
    }
    return updatedPost;
  }

  async dislikePost(postId: string, userId: string) {
    const postCollection = this.db.collection('posts');
    const post = await postCollection.doc(postId).get();
    let updatedPost;
    if (post.exists) {
      const data = post.data();
      data.likes = data.likes.filter((id: string) => id !== userId) || [];
      updatedPost = await postCollection.doc(postId).update({
        likes: data.likes,
      });
      const isDisliked = data.dislikes.includes(userId);
      if (isDisliked) {
        data.dislikes =
          data.dislikes.filter((id: string) => id !== userId) || [];
        updatedPost = await postCollection.doc(postId).update({
          dislikes: data.dislikes,
        });
      } else {
        data.dislikes.push(userId);
        updatedPost = await postCollection.doc(postId).update({
          dislikes: data.dislikes,
        });
      }
    }
    return updatedPost;
  }
}
