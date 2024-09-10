import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';
import { AuthorDto } from 'src/posts/dtos/author.dto';

@Injectable()
export class UserService {
  private auth: Auth;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.auth = firebaseApp.auth();
  }

  async getUser(userId: string): Promise<AuthorDto> {
    const user = await this.auth.getUser(userId);
    return {
      id: user.uid,
      name: user.displayName,
      photoUrl: user.photoURL,
    };
  }

  async deleteUser(userId: string) {
    return await this.auth.deleteUser(userId);
  }
}
