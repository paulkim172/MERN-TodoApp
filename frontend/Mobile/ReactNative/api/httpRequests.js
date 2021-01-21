import {_storeRefreshJWT, _retrieveAccessJWT} from '../device/asyncStorage';
import {getUniqueId} from '../device/deviceInfo';

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
  console.log('login response data: ' + data.refreshToken);
  await _storeRefreshJWT(data.refreshToken);
  return data.currentUser;
};

const accessSubmit = async (url = `${domain}/access`) => {
  try {
    let response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: _retrieveAccessJWT(),
      },
    });
    let data = await response.json();
    console.log('access response data: ' + data.accesstoken);
    return data.user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const refreshSubmit = async (refreshJWT, url = `${domain}/refresh`) => {
  try {
    console.log('refreshSubmit called');
    console.log('refresh token: ' + refreshJWT);
    console.log('deviceId: ' + deviceId);

    let response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: refreshJWT,
        deviceId: deviceId,
      },
    });
    let data = await response.json();
    console.log('refresh submit data: ' + data);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
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
