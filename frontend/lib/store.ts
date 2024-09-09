import postsReducer from '@/lib/features/posts/postsSlice';
import commentsReducer from '@/lib/features/comments/commentsSlice';
import loaderReducer from '@/lib/features/loader/loaderSlice'
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
  return configureStore({
    reducer: {
      posts: postsReducer,
      comments: commentsReducer,
      loader: loaderReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
