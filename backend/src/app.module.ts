import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { PostModule } from './posts/post.module';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    FirebaseModule,
    ConfigModule.forRoot({ cache: true }),
    PostModule,
    UserModule,
    CommentsModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
