import {createSlice} from '@reduxjs/toolkit';
import {setCurrentUser, removeCurrentUser} from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    //Delete User Info when logged out
    [removeCurrentUser]: (state, action) => {
      state = {};
    },
  },

  extraReducers: {
    //Get Only Login User Info
    [setCurrentUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [setCurrentUser.rejected]: (state, action) => {
      state.user = {};
    },
  },
});

export default userSlice.reducer;
