import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    repositories: [],
    followers: [],
    username: '',
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
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUserData, setRepositories, setFollowers, setUsername } = userSlice.actions;
export default userSlice.reducer;