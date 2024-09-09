import { IAuthor } from './IAuthor';

export interface IComment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: string;
  author: IAuthor;
}