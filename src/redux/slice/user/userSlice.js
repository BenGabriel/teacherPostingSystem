import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  user: null,
  school: null,
  rejected: 0,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    saveSchool: (state, action) => {
      state.school = action.payload;
    },
    rejectPosting: state => {
      state.school = null;
      state.rejected = state.rejected + 1;
    },
    loginUser: state => {
      state.loggedIn = true;
    },
    logoutUser: state => {
      state.loggedIn = false
      state.user = null
      state.school = null
      state.rejected = 0
    }
  },
});

export const {saveUser, saveSchool, rejectPosting, loginUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
