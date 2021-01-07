import {createAction} from '@reduxjs/toolkit';

const setCurrentUser = createAction('setCurrentUser', function (currentUser) {
  return {
    payload: currentUser,
  };
});
const removeCurrentUser = createAction('removeCurrentUser');

export {setCurrentUser, removeCurrentUser};
