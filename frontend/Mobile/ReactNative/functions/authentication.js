import {
  _storeAccessJWT,
  _retrieveAccessJWT,
  _retrieveRefreshJWT,
} from '../device/asyncStorage';
import {accessSubmit, refreshSubmit} from './httpRequests';

const isSignedIn = () => {
  let accessToken = _retrieveAccessJWT;
  let refreshToken = _retrieveRefreshJWT;

  if (accessSubmit(accessToken)) {
    return true;
  } else {
    if (refreshSubmit(refreshToken)) {
      _storeAccessJWT();
      return true;
    }
  }
  return false;
};

export {isSignedIn};
