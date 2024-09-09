import { IPost } from '@/interfaces/IPost';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPostsState {
  posts: IPost[];
}

const initialState: IPostsState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    loadPosts: (state: IPostsState, action: PayloadAction<IPost[]>) => {
      state.posts = [...action.payload];
    },
    getMorePosts: (state: IPostsState, action: PayloadAction<IPost[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },
    addPost: (state: IPostsState, action: PayloadAction<IPost>) => {
      state.posts.unshift(action.payload);
    },
    removePost: (state: IPostsState, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
  },
});

export const { loadPosts, addPost, removePost, getMorePosts } = postsSlice.actions;
export default postsSlice.reducer;
