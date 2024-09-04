import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }
    const idToken = authHeader.split(' ')[1];
    try {
      const claims = await this.firebaseApp.auth().verifyIdToken(idToken);
      request.user = {
        uid: claims.uid,
        fullName: claims.name,
        avatarUrl: claims.picture,
      };
      return true;
    } catch (error) {
      console.log('Error', error);
      throw new UnauthorizedException();
    }
  }
}
