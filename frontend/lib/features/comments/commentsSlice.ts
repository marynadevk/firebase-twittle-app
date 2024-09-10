import { IComment } from '@/interfaces/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICommentsState {
  comments: IComment[];
}

const initialState: ICommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    loadComments: (
      state: ICommentsState,
      action: PayloadAction<IComment[]>
    ) => {
      state.comments = action.payload;
    },
    addComment: (state: ICommentsState, action: PayloadAction<IComment>) => {
      state.comments.unshift(action.payload);
    },
    removeComment: (state: ICommentsState, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
    },
    changeComment: (state: ICommentsState, action: PayloadAction<IComment>) => {
      const index = state.comments.findIndex(
        (comment) => comment.id === action.payload.id
      );

      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
  },
});

export const { loadComments, addComment, changeComment, removeComment } =
  commentsSlice.actions;
export default commentsSlice.reducer;
