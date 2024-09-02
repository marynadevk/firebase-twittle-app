import { ICreatePost } from '@/interfaces/ICreatePost';
import api from './client';

export const createPost = (post: ICreatePost) => {
  return api.post('/posts', post);
};

export const getPosts = () => {
  return api.get('/posts');
};

export const updatePost = (id: string, post: ICreatePost) => {
  return api.put(`/posts/${id}`, post);
};

export const updatePostLike = (postId: string) => {
  return api.put(`/posts/${postId}/like`);
};

export const updatePostDislike = (postId: string) => {
  return api.put(`/posts/${postId}/dislike`);
};

export const deletePost = (id: string) => {
  return api.delete(`/posts/${id}`);
};
