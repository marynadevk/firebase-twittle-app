import { Inject, Injectable } from '@nestjs/common';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { app } from 'firebase-admin';
import { ResponsePostDto } from '../dtos/response-post.dto';
// import { ResponsePostDto } from '../dtos/response-post.dto';

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
      text: request.text,
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    });
    console.log('New post', newPost);
    return newPost.id;
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
        text: data.text,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
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
        text: data.text,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      };
    });
    return postsData;
  }
}
