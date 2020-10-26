import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';


function Login (props) {

  let loginSubmit = props.loginSubmit;
    
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
    loginSubmit(data);
  }

    return (
      <View>
        <Text>Username</Text>
        <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            // style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Text>Username and Password is required.</Text>}
        <Text>Password</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              // style={styles.input}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="password"
          defaultValue=""
        />
        <Button
          style={{fontSize: 20, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={handleSubmit(onSubmit)}
          title="Submit">Submit</Button>
      </View>
    );
}

export default Login;