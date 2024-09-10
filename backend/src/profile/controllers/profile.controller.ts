import { Controller, Delete, Inject, UseGuards } from '@nestjs/common';
import { ProfileService } from '../services/profile.service';
import { User } from 'src/decorators/user.decorator';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(@Inject() private profileService: ProfileService) {}

  @Delete()
  async deleteUserProfile(@User() user: UserInfoDto) {
    return this.profileService.deleteUserProfile(user.uid);
  }
}
