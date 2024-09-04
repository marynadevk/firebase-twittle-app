import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(@Inject() private userService: UserService) {}

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getUser(@Param('id') id: string,) {
    return await this.userService.getUser(id);
  }
}
