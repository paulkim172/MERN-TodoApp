import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeAccessJWT = async (x) => {
  try {
    await AsyncStorage.setItem('accessToken', x);
    console.log(
      'stored access token!: ' + (await AsyncStorage.getItem('accessToken')),
    );
  } catch (err) {
    console.log(err);
  }
};

export const _retrieveAccessJWT = async () => {
  try {
    let currentAccessToken = await AsyncStorage.getItem('accessToken');
    console.log('retrieved access token!: ' + currentAccessToken);
    return currentAccessToken;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const _storeRefreshJWT = async (x) => {
  try {
    await AsyncStorage.setItem('refreshToken', x);
    console.log(
      'stored refresh token!: ' + (await AsyncStorage.getItem('refreshToken')),
    );
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const _retrieveRefreshJWT = async () => {
  try {
    let refreshJWT = await AsyncStorage.getItem('refreshToken');
    console.log('refreshToken retrieved');
    return refreshJWT;
  } catch (err) {
    console.log(err);
    return null;
  }
};
