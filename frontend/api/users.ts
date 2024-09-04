import api from './client';

export const getUser = (id: string) => {
  return api.get(`/user/${id}`);
};
