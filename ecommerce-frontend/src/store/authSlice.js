import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,     // { name, email }
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    signup(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateProfile(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, signup, logout, updateProfile } = authSlice.actions;

export default authSlice.reducer;
