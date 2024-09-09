import api from './client';

export const createComment = (postId: string, text: string) => {
  return api.post(`/posts/${postId}/comments`, { text });
};

export const getComments = (postId: string) => {
  return api.get(`/posts/${postId}/comments`);
};

export const updateComment = (postId: string, commentId: string, text: string) => {
  return api.put(`/posts/${postId}/comments/${commentId}`, { text });
};

export const deleteComment = (postId: string, commentId: string) => {
  return api.delete(`/posts/${postId}/comments/${commentId}`);
};

export const deleteCommentsByPostId = (postId: string) => {
  return api.delete(`/posts/${postId}/comments`);
};
