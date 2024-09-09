import { AuthorDto } from './author.dto';

export class PostDto {
  title: string;
  text: string;
  image?: string;
  imageName?: string | '';
  likes: string[] | [];
  dislikes: string[] | [];
  comments?: string[] | [];
  authorId: string;
  createdAt: Date;
  id?: string;
  author: AuthorDto;
}
