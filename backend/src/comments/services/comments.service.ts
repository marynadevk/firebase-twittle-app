import { Inject, Injectable } from '@nestjs/common';
import { Auth } from 'firebase-admin/auth';
import { CommentDto } from '../dtos/comment.dto';
import { app } from 'firebase-admin';
import { CommentsRepository } from '../repositories/comments.repository';
import { PostService } from '../../posts/services/post.service';
import { Timestamp } from 'firebase-admin/firestore';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class CommentsService {
  private auth: Auth;

  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    @Inject() private commentsRepository: CommentsRepository,
    @Inject() private postService: PostService,
    @Inject() private userService: UserService,
  ) {
    this.auth = firebaseApp.auth();
  }
  async getComments(postId: string): Promise<CommentDto[]> {
    const comments = await this.commentsRepository.getComments(postId);

    return Promise.all(
      comments.map(async (comment) => {
        const data = comment.data();
        return {
          id: comment.id,
          postId: data.postId,
          text: data.text,
          authorId: data.authorId,
          author: await this.userService.getUser(data.authorId),
          createdAt: data.createdAt.toDate(),
        };
      }),
    );
  }

  async createComment(
    request: CommentDto,
    postId: string,
    user: UserInfoDto,
  ): Promise<CommentDto> {
    const newComment = {
      postId,
      text: request.text,
      authorId: user.uid,
      createdAt: Timestamp.fromDate(new Date()),
    };
    const id = await this.commentsRepository.createComment(newComment);
    this.postService.addCommentId(postId, id);
    return {
      ...newComment,
      id,
      createdAt: newComment.createdAt.toDate(),
      author: {
        id: user.uid,
        name: user.fullName,
        photoUrl: user.avatarUrl,
      },
    };
  }

  async updateComment(
    input: CommentDto,
    commentId: string,
    user: UserInfoDto,
  ): Promise<CommentDto> {
    const comment = await this.commentsRepository.getCommentById(commentId);
    if (comment.authorId !== user.uid) {
      throw new Error('You are not authorized to update this comment');
    }
    await this.commentsRepository.updateComment(commentId, input);
    const author = await this.userService.getUser(comment.authorId);
    return {
      id: commentId,
      ...comment,
      ...input,
      createdAt: comment.createdAt.toDate(),
      author,
    };
  }

  async deleteComment(commentId: string, postId: string, user: UserInfoDto) {
    const comment = await this.commentsRepository.getCommentById(commentId);
    if (comment.authorId !== user.uid) {
      throw new Error('You are not authorized to delete this comment');
    }
    await this.commentsRepository.deleteComment(commentId);
    return this.postService.removeCommentId(postId, commentId);
  }

  async deleteCommentsByPostId(postId: string) {
    await this.commentsRepository.deleteCommentByPostId(postId);
  }
}
