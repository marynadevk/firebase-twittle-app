import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '@/lib/features/posts/postsSlice';
import commentsReducer from '@/lib/features/comments/commentsSlice';
import loaderReducer from '@/lib/features/loader/loaderSlice';
import authReducer from '@/lib/features/auth/authSlice';
import searchQueryReducer from '@/lib/features/searchQuery/searchQuerySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
      loader: loaderReducer,
      auth: authReducer,
      query: searchQueryReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
