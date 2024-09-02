export class ResponsePostDto {
  title: string;
  text: string;
  image?: string;
  likes: string[] | [];
  dislikes: string[] | [];
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  id: string;
}
