import {AsyncStorage} from '@react-native-async-storage/async-storage';

export const _storeAccessJWT = async (x) => {
  try {
    await AsyncStorage.setItem('accessToken', x);
  } catch (err) {
    console.log(err);
  }
};

export const _retrieveAccessJWT = async () => {
  try {
    let value = await AsyncStorage.getItem('accessToken');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

export const _storeRefreshJWT = async (x) => {
  try {
    await AsyncStorage.setItem('refreshToken', x);
  } catch (err) {
    console.log(err);
  }
};

export const _retrieveRefreshJWT = async () => {
  try {
    let value = await AsyncStorage.getItem('refreshToken');
    if (value !== null) {
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};
