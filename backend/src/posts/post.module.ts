import { Module } from '@nestjs/common';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [PostService],
  controllers: [PostController],
  imports: [FirebaseModule],
})
export class PostModule {}
