import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import {loginSubmit} from '../../api/httpRequests';

const setCurrentUser = createAsyncThunk('setCurrentUser', async (input) => {
  let currentUser = await loginSubmit(input);
  return currentUser;
});

const removeCurrentUser = createAction('removeCurrentUser');

export {setCurrentUser, removeCurrentUser};
