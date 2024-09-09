import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PostService } from '../services/post.service';
import { User } from 'src/decorators/user.decorator';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';
import { PostDto } from '../dtos/post.dto';

const PAGE_SIZE = 5;
@Controller('posts')
export class PostController {
  constructor(@Inject() private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() input: PostDto, @User() user: UserInfoDto) {
    return this.postService.create(input, user);
  }

  @Get()
  async getPosts(
    @Query('size') size: number = PAGE_SIZE,
    @Query('userId') userId?: string,
    @Query('lastDoc') lastDoc?: string,
  ) {
    return this.postService.getPosts(size, userId, lastDoc);
  }

  @Get('/:id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() input: PostDto,
    @User() user: UserInfoDto,
  ) {
    const response = this.postService.updatePost(id, input, user);
    return response;
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  async deletePost(@Param('id') id: string, @User() user: UserInfoDto) {
    this.postService.deletePost(id, user);
    return 'This action removes a post';
  }

  @Put('/:id/like')
  @UseGuards(AuthGuard)
  async likePost(@Param('id') id: string, @User() user: UserInfoDto) {
    return await this.postService.likePost(id, user.uid);
  }

  @Put('/:id/dislike')
  @UseGuards(AuthGuard)
  async dislikePost(@Param('id') id: string, @User() user: UserInfoDto) {
    return await this.postService.dislikePost(id, user.uid);
  }
}
