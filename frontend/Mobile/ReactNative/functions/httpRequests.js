import {
  _storeRefreshJWT,
  _retrieveAccessJWT,
  _retrieveRefreshJWT,
} from '../device/asyncStorage';
import {getUniqueId} from '../device/deviceInfo';

const domain = 'http://192.168.0.10:3000';
const deviceId = getUniqueId();

const loginSubmit = async (data, url = `${domain}/login`) => {
  console.log(data['username/email']);
  console.log(data.password);
  console.log(deviceId);
  await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      deviceId: deviceId,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((key) => console.log(key))
    .then((key) => _storeRefreshJWT(key))
    .then(refreshSubmit())
    .catch((err) => {
      console.log(err);
    });
};

const accessSubmit = async (url = `${domain}/access`) => {
  await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: _retrieveAccessJWT,
    },
  })
    .then(() => console.log('promise accepted'))
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

const refreshSubmit = async (url = `${domain}/refresh`) => {
  await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: _retrieveRefreshJWT,
      deviceId: deviceId,
    },
  })
    .then(() => console.log('promise accepted'))
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

export {loginSubmit, accessSubmit, refreshSubmit};
