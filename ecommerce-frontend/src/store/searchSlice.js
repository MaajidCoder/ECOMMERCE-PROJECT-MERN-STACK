import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  category: 'All',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setSearchQuery, setCategory } = searchSlice.actions;

export default searchSlice.reducer;
