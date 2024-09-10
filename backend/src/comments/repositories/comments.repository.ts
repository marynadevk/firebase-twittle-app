import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';

@Injectable()
export class CommentsRepository {
  private db: Firestore;
  private commentsCollection;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
    this.commentsCollection = this.db.collection('comments');
  }

  async getComments(postId: string) {
    const commentsCollection = this.commentsCollection
      .where('postId', '==', postId)
      .orderBy('createdAt', 'desc');

    return (await commentsCollection.get()).docs;
  }

  async getCommentById(commentId: string) {
    return (await this.commentsCollection.doc(commentId).get()).data();
  }

  async createComment(data: any) {
    return (await this.commentsCollection.add(data)).id;
  }

  async updateComment(commentId: string, data: any) {
    return await this.commentsCollection.doc(commentId).update({
      text: data.text,
    });
  }

  async deleteComment(commentId: string) {
    return this.commentsCollection.doc(commentId).delete();
  }

  async deleteCommentByPostId(postId: string) {
    return this.commentsCollection.where('postId', '==', postId).delete();
  }

  async deleteCommentsByAuthorId(userId: string) {
    const comments = await this.commentsCollection
      .where('authorId', '==', userId)
      .get();
    if (comments) {
      comments.forEach((comment) => {
        comment.ref.delete();
      });
    }
  }

  async getCommentsAmountByPostId(postId: string) {
    return (
      await this.commentsCollection.where('postId', '==', postId).count().get()
    ).data().count;
  }
}
