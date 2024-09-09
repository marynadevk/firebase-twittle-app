import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CommentDto } from '../dtos/comment.dto';
import { User } from 'src/decorators/user.decorator';
import { UserInfoDto } from 'src/user/dtos/user-info.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(@Inject() private commentsService: CommentsService) {}

  @Get('/')
  async getComments(@Param('postId') postId: string) {
    return await this.commentsService.getComments(postId);
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async createComment(
    @Body() input: CommentDto,
    @Param('postId') postId: string,
    @User() user: UserInfoDto,
  ) {
    return this.commentsService.createComment(input, postId, user);
  }

  @Put('/:commentId')
  @UseGuards(AuthGuard)
  async updateComment(
    @Body() input: CommentDto,
    @Param('commentId') commentId: string,
    @User() user: UserInfoDto,
  ) {
    return this.commentsService.updateComment(input, commentId, user);
  }

  @Delete('/:commentId')
  @UseGuards(AuthGuard)
  async deleteComment(
    @Param('commentId') commentId: string,
    @Param('postId') postId: string,
    @User() user: UserInfoDto,
  ) {
    return this.commentsService.deleteComment(commentId, postId, user);
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  async deleteCommentsByPostId(@Param('postId') postId: string) {
    return this.commentsService.deleteCommentsByPostId(postId);
  }
}
