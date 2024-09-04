import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [FirebaseModule],
})
export class UserModule {}
