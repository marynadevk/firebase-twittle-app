import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(@Inject() private userService: UserService) {}

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getUser(id);
  }
}
