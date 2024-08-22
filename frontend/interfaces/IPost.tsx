export interface IPost {
  title: string;
  text: string;
  image?: string;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  id: string;
}