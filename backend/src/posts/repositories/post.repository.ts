import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Firestore, Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class PostRepository {
  private db: Firestore;
  private postCollection;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
    this.postCollection = this.db.collection('posts');
  }

  async createPost(data: any) {
    return (await this.postCollection.add(data)).id;
  }

  async getPosts(page: number, size: number) {
    const postCollection = this.postCollection.orderBy('createdAt', 'desc');
    // .startAt(Timestamp.now())
    // .limit(size);

    return (await postCollection.get()).docs;
  }

  async getUsersPosts(userId: string, page: number, size: number) {
    const posts = await this.postCollection
      .where('authorId', '==', userId)
      .orderBy('createdAt', 'desc')
      // .startAt(page * size)
      // .limit(size)
      .get();

    return posts.docs;
  }

  async updatePost(id: string, data: any) {
    const postCollection = this.db.collection('posts');
    return await postCollection.doc(id).update({
      title: data.title,
      image: data.image,
      imageName: data.imageName || '',
      text: data.text,
    });
  }

  async updatePostLikes(id: string, likes: string[], dislikes: string[]) {
    return await this.postCollection.doc(id).update({
      likes,
      dislikes,
    });
  }

  async getPostById(id: string) {
    const postCollection = this.db.collection('posts');
    return (await postCollection.doc(id).get()).data();
  }

  async deletePost(id: string) {
    const postCollection = this.db.collection('posts');
    return await postCollection.doc(id).delete();
  }
}
