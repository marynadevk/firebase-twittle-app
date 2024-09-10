import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreDoc } from '../services/post.service';

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

  async getPosts(size: number, userId: string, lastDoc?: FirestoreDoc) {
    let query = this.postCollection
      .orderBy('createdAt', 'desc')
      .limit(Number(size));
    if (userId) {
      query = query.where('authorId', '==', userId);
    }
    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }
    const posts = (await query.get()).docs;
    const lastPosts = posts[posts.length - 1];
    return {
      posts,
      lastDoc: lastPosts,
    };
  }

  async updatePost(id: string, data: any) {
    return await this.postCollection.doc(id).update({
      title: data.title,
      image: data.image || '',
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

  async addCommentId(id: string, commentId: string) {
    const post = await this.getPostById(id);
    const comments = post?.comments || [];
    return await this.postCollection.doc(id).update({
      comments: [...comments, commentId],
    });
  }

  async removeCommentId(id: string, commentId: string) {
    const post = await this.getPostById(id);
    const comments = post?.comments || [];
    return await this.postCollection.doc(id).update({
      comments: comments.filter((id: string) => id !== commentId),
    });
  }

  async getPostById(id: string) {
    return (await this.postCollection.doc(id).get()).data();
  }

  async deletePost(id: string) {
    return await this.postCollection.doc(id).delete();
  }

  async deletePostsByAuthorId(userId: string) {
    const posts = await this.postCollection
      .where('authorId', '==', userId)
      .get();
    if (posts) {
      posts.forEach((post) => {
        post.ref.delete();
      });
    }
  }
}
