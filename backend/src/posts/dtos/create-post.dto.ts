export class CreatePostDto {
  title: string;
  text: string;
  image?: string;
  imageName?: string;
  likes?: string[] | [];
  dislikes?: string[] | [];
}
