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
    const user = (await this.auth.getUsers([{ uid: userId }])).users[0];

    return {
      id: user.uid,
      name: user.displayName,
      photoUrl: user.photoURL,
    };
  }
}
