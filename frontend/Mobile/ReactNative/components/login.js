import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {loginSubmit} from '../functions/httpRequests';
import {Card, Input, Button} from 'react-native-elements';
import styles from '../assets/css/styles';

function Login() {
  const {control, handleSubmit, errors} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    loginSubmit(data);
  };

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/freenaturestock-1743.jpg')}
        style={styles.backgroundImage}>
        <Card>
          <Text>Username</Text>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                // style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange(value)}
                value={value}
              />
            )}
            name="username"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.username && (
            <Text>Username and/or Password is required.</Text>
          )}
          <Text>Password</Text>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Input
                // style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange(value)}
                value={value}
              />
            )}
            name="password"
            defaultValue=""
          />
          <Button onPress={handleSubmit(onSubmit)} title="Submit">
            Submit
          </Button>
        </Card>
      </ImageBackground>
    </View>
  );
}

export default Login;
