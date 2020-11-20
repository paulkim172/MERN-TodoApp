import {
  _storeAccessJWT,
  _retrieveAccessJWT,
  _retrieveRefreshJWT,
} from '../asyncStorage';
import {JWTSubmit} from './httpRequests';

const isSignedIn = () => {
  let accessToken = _retrieveAccessJWT;
  let refreshToken = _retrieveRefreshJWT;
  if (JWTSubmit(accessToken)) {
    return true;
  } else {
    if (JWTSubmit(refreshToken)) {
      _storeAccessJWT();
    } else {
      return false;
    }
  }
};

export {isSignedIn};
