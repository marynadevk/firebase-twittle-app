import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PostRepository } from './repositories/post.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [PostService, PostRepository],
  controllers: [PostController],
  imports: [FirebaseModule, UserModule],
  exports: [PostService],
})
export class PostModule {}
