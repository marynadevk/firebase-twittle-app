import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { CommentsService } from 'src/comments/services/comments.service';
import { PostService } from 'src/posts/services/post.service';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class ProfileService {
  private auth: Auth;

  constructor(
    @Inject('FIREBASE_APP') private firebaseApp: app.App,
    @Inject() private userService: UserService,
    @Inject() private commentsService: CommentsService,
    @Inject() private postService: PostService,
  ) {
    this.auth = firebaseApp.auth();
  }

  async deleteUserProfile(userId: string) {
    this.userService.deleteUser(userId);
    this.postService.deletePostsByAuthorId(userId);
    this.commentsService.deleteCommentsByAuthorId(userId);
  }
}
