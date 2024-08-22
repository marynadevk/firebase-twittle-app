import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostService } from '../services/post.service';
import { User } from 'src/decorators/user.decorator';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';

@Controller('posts')
export class PostController {
  constructor(@Inject() private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() input: CreatePostDto, @User() user: UserInfoDto) {
    this.postService.create(input, user);
    return 'This action adds a new post';
  }

  @Get()
  async getPosts() {
    return this.postService.getPosts();
  }

  @Get('/:id')
  async getUsersPosts(@Param('id') id: string) {
    return this.postService.getUsersPosts(id);
  }
}
