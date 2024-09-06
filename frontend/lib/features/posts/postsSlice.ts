import { IPost } from '@/interfaces/IPost';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPostsState {
  posts: IPost[];
}
interface LoadUsersPostsPayload {
  posts: IPost[];
  authorId: string;
}

const initialState: IPostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state: IPostsState, action: PayloadAction<IPost[]>) => {
      state.posts = action.payload;
    },
    loadUsersPosts: (state: IPostsState, action: PayloadAction<LoadUsersPostsPayload>) => {
      state.posts = action.payload.posts.filter((post) => post.authorId === action.payload.authorId);
    },
    addPost: (state: IPostsState, action: PayloadAction<IPost>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state: IPostsState, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { loadPosts, addPost, removePost, loadUsersPosts } = postsSlice.actions;
export default postsSlice.reducer;
