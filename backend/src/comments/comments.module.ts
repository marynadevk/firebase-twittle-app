import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CommentsRepository } from './repositories/comments.repository';
import { PostModule } from 'src/posts/post.module';
import { UserModule } from 'src/user/user.module';

@Module({
  exports: [CommentsService],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  imports: [FirebaseModule, PostModule, UserModule],
})
export class CommentsModule {}
