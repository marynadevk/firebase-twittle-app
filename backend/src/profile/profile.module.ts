import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile.controller';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/posts/post.module';
import { CommentsModule } from 'src/comments/comments.module';
import { ProfileService } from './services/profile.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  exports: [ProfileService],
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [FirebaseModule, UserModule, PostModule, CommentsModule],
})
export class ProfileModule {}
