import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IQueryState {
  query: string;
}

const initialState: IQueryState = {
  query: '',
};

export const searchQuerySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state: IQueryState, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
