import {_storeAccessJWT, _retrieveAccessJWT} from '../device/asyncStorage';
import {accessSubmit, refreshSubmit} from './httpRequests';

const isSignedIn = async () => {
  let accessToken = _retrieveAccessJWT;

  if (await accessSubmit(accessToken)) {
    return true;
  } else {
    let refreshPayload = await refreshSubmit();
    if (refreshPayload) {
      _storeAccessJWT();
      return true;
    }
  }
  return false;
};

export {isSignedIn};
