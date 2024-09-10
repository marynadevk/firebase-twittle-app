import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CommentsRepository } from './repositories/comments.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  exports: [CommentsService],
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  imports: [FirebaseModule, UserModule],
})
export class CommentsModule {}
