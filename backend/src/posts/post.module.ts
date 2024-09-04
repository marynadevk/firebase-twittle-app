import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { PostRepository } from './repositories/post.repository';

@Module({
  providers: [PostService, PostRepository],
  controllers: [PostController],
  imports: [FirebaseModule],
})
export class PostModule {}
