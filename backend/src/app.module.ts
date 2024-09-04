import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';
import { PostModule } from './posts/post.module';
import { UserService } from './user/services/user.service';
import { UserController } from './user/controllers/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    FirebaseModule,
    ConfigModule.forRoot({ cache: true }),
    PostModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
