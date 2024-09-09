import { AuthorDto } from 'src/posts/dtos/author.dto';

export class CommentDto {
  postId: string;
  text: string;
  authorId: string;
  createdAt: Date;
  id?: string;
  author?: AuthorDto;
}
