export interface IPost {
  title: string;
  text: string;
  image?: string;
  imageName?: string;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  id: string;
  likes: string[];
  dislikes: string[];
}