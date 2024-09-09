import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { app } from 'firebase-admin';
import { Auth } from 'firebase-admin/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  private auth: Auth;
  
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.auth = firebaseApp.auth();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const idToken = authHeader.split(' ')[1];
    try {
      const claims = await this.auth.verifyIdToken(idToken);
      const user = await this.auth.getUser(claims.uid);
      request.user = {
        uid: claims.uid,
        fullName: user.displayName,
        avatarUrl: user.photoURL,
      };
      return true;
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
