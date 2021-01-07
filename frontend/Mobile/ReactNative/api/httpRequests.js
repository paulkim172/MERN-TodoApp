import {
  _storeRefreshJWT,
  _retrieveAccessJWT,
  _retrieveRefreshJWT,
} from '../device/asyncStorage';
import {getUniqueId} from '../device/deviceInfo';
import {setCurrentUser} from '../reducers/actions/userActions';
import {dispatch} from 'react-redux';

const domain = 'http://192.168.0.10:3000';
const deviceId = getUniqueId();

const loginSubmit = async (input, url = `${domain}/login`) => {
  console.log(input['username/email']);
  console.log(input.password);
  console.log(deviceId);
  let response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      deviceId: deviceId,
    },
    body: JSON.stringify(input),
  });
  let data = await response.json();
  console.log(data);
  await _storeRefreshJWT(data.refreshToken);
  await dispatch(setCurrentUser(data.currentUser));
  refreshSubmit;
};

const accessSubmit = async (url = `${domain}/access`) => {
  let response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: _retrieveAccessJWT,
    },
  });
  console.log('promise accepted');
  console.log(response);
  let data = await response.json();
  return data.user;
};

const refreshSubmit = async (url = `${domain}/refresh`) => {
  let response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: _retrieveRefreshJWT,
      deviceId: deviceId,
    },
  });
  let data = await response.json();
  return data;
};

const fetchUserInfo = async (userPayload, thunkAPI, url = `${domain}/user`) => {
  return fetch(url, {
    signal: thunkAPI.signal,
    body: JSON.stringify(userPayload),
  })
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

export {loginSubmit, accessSubmit, refreshSubmit, fetchUserInfo};
