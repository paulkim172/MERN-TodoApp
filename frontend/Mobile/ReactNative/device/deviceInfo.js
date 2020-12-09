import {getUniqueId, getManufacturer} from 'react-native-device-info';

exports.getUniqueId = () => {
  return getUniqueId();
};

exports.getManufacturer = () => {
  return getManufacturer();
};
