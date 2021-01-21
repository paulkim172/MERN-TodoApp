import {
  _storeAccessJWT,
  _retrieveAccessJWT,
  _retrieveRefreshJWT,
} from '../device/asyncStorage';
import {accessSubmit, refreshSubmit} from './httpRequests';
import store from '../reducers/redux';

const isSignedIn = async () => {
  let accessToken = await _retrieveAccessJWT();
  let refreshToken = await _retrieveRefreshJWT();

  console.log('accesstoken: ' + accessToken);
  console.log('refreshtoken: ' + refreshToken);
  if (accessToken) {
    console.log('there is access token');
    let accessUser = await accessSubmit(accessToken);
    let currentUser = JSON.stringify(store.getState().user);
    console.log('accessUser: ' + accessUser);
    console.log('currentUser: ' + currentUser);

    if (
      accessUser.username !== store.getState().user.username ||
      accessUser.id !== store.getState().user.id
    ) {
      let newAccessTokenIfRefreshTokenIsWorking = await refreshSubmit(
        refreshToken,
      );
      console.log(
        'newAccessTokenIfRefreshTokenIsWorking: ' +
          newAccessTokenIfRefreshTokenIsWorking,
      );
      if (newAccessTokenIfRefreshTokenIsWorking) {
        await _storeAccessJWT(newAccessTokenIfRefreshTokenIsWorking);
        return isSignedIn();
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    console.log('no access token');
    if (refreshToken) {
      console.log('refresh token: ' + refreshToken);
      console.log('there is refresh token');
      let newAccessTokenIfRefreshTokenIsWorking = await refreshSubmit(
        refreshToken,
      );
      console.log(
        'newAccessTokenIfRefreshTokenIsWorking: ' +
          newAccessTokenIfRefreshTokenIsWorking,
      );
      if (newAccessTokenIfRefreshTokenIsWorking) {
        await _storeAccessJWT(newAccessTokenIfRefreshTokenIsWorking);
        return isSignedIn();
      }
    } else {
      return false;
    }
  }
};

console.log(isSignedIn());

export {isSignedIn};
