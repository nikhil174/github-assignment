import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    repositories: [],
    followers: [],
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setRepositories: (state, action) => {
      state.repositories = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
  },
});

export const { setUserData, setRepositories, setFollowers } = userSlice.actions;

export const selectUserData = (state) => state.user.userData;
export const selectRepositories = (state) => state.user.repositories;
export const selectFollowers = (state) => state.user.followers;

export default userSlice.reducer;