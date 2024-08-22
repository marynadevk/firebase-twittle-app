import { ICreatePost } from '@/interfaces/ICreatePost';
import api from './client';

export const createPost = (post: ICreatePost) => {
  return api.post('/posts', post);
};

export const getPosts = () => {
  return api.get('/posts');
};
