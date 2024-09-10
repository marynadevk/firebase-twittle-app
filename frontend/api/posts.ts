import { ICreatePost } from '@/interfaces/index';
import api from './client';

export const createPost = (post: ICreatePost) => {
  return api.post('/posts', post);
};

export const getPosts = (lastDoc?: string | null, userId?: string, size?: number) => {
  let url = '/posts?';
  if (lastDoc) {
    url += `lastDoc=${lastDoc}`;
  }
  if (userId) {
    url += `&userId=${userId}`;
  }
  if (size) {
    url += `&size=${size}`;
  }
  return api.get(url);
};

export const getPostById = (id: string) => {
  return api.get(`/posts/${id}`);
};

export const getUsersPosts = (userId: string) => {
  return api.get(`/posts/user/${userId}`);
};

export const updatePost = (id: string, post: ICreatePost) => {
  return api.put(`/posts/${id}`, post);
};

export const deletePost = (id: string) => {
  return api.delete(`/posts/${id}`);
};

export const updatePostLike = (postId: string) => {
  return api.put(`/posts/${postId}/like`);
};

export const updatePostDislike = (postId: string) => {
  return api.put(`/posts/${postId}/dislike`);
};

export const createComment = (postId: string, text: string) => {
  return api.post(`/posts/${postId}/comments`, { text });
};

export const getComments = (postId: string) => {
  return api.get(`/posts/${postId}/comments`);
};
