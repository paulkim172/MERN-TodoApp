import React, {useEffect} from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {useForm} from 'react-hook-form';
import {Card, Input, Button} from 'react-native-elements';
import {styles} from '../assets/css/styles-login';
import {connect} from 'react-redux';
import {setCurrentUser} from '../reducers/actions/userActions';

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: (data) => {
      console.log('loginSubmit');
      dispatch(setCurrentUser(data));
    },
  };
}

function Login({navigation, submitLogin}) {
  const {register, setValue, handleSubmit, errors} = useForm();

  useEffect(() => {
    register('username/email');
    register('password');
  }, [register]);

  return (
    <View style={styles.view}>
      <ImageBackground
        source={require('../assets/images/freenaturestock-1743.jpg')}
        style={styles.backgroundImage}>
        <Card containerStyle={styles.cardContainer}>
          <Text>Username/Email</Text>
          <Input
            placeholder="Username or Email"
            style={styles.input}
            onChangeText={(text) => {
              setValue('username/email', text);
            }}
          />
          {errors.username && (
            <Text>Username and/or Password is required.</Text>
          )}
          <Text>Password</Text>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setValue('password', text);
            }}
          />
          <Text style={styles.text1}>Forgot Username and/or Password?</Text>

          <Button
            onPress={handleSubmit((data) => submitLogin(data))}
            title="Submit">
            Submit
          </Button>
          <Text style={styles.text2}>
            Don't Have an Account?{' '}
            <Text
              style={styles.link}
              onPress={() => {
                navigation.navigate('Register');
              }}>
              Sign Up Now
            </Text>
          </Text>
        </Card>
      </ImageBackground>
    </View>
  );
}

export default connect(null, mapDispatchToProps)(Login);
