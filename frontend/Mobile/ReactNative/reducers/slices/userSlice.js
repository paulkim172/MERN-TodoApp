import {createSlice} from '@reduxjs/toolkit';
import {setCurrentUser, removeCurrentUser} from '../actions/userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    //Get User Info when logged in
    [setCurrentUser]: (state, action) => {
      state = action.payload;
    },
    //Delete User Info when logged out
    [removeCurrentUser]: (state, action) => {
      state = {};
    },
  },
});

export default userSlice.reducer;
