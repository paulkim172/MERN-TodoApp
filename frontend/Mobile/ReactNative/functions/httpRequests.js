import {_storeRefreshJWT} from '../asyncStorage';

const domain = 'http://192.168.0.10:3000';

const loginSubmit = async (data, url = `${domain}/login`) => {
  console.log(data.username);
  console.log(data.password);
  await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => console.log('promise accepted'))
    .then((res) => res.json())
    .then((key) => _storeRefreshJWT(key))
    .catch((err) => {
      console.log(err);
    });
};

const accessSubmit = async (data, url = `${domain}/access`) => {
  console.log(data);
  await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => console.log('promise accepted'))
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

const refreshSubmit = async (data, url = `${domain}/refresh`) => {
  console.log(data);
  await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(() => console.log('promise accepted'))
    .then((res) => console.log(res))
    .catch((err) => {
      console.log(err);
    });
};

export {loginSubmit, accessSubmit, refreshSubmit};
