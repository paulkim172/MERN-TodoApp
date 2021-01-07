import React from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {Input, Button} from 'react-native-elements';
import {registerSubmit} from '../api/httpRequests';
import {styles} from '../assets/css/styles-register';

function Register({navigation}) {
  const {setValue, handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    registerSubmit(data);
  };
  return (
    <View style={styles.view}>
      <Text>Create An Account</Text>
      <View style={styles.container}>
        <Input
          inputContainerStyle={styles.inputContainer}
          placeholder="email@address.com"
          style={styles.input}
          onChangeText={(text) => {
            setValue('email', text);
          }}
        />
        <Input
          inputContainerStyle={styles.inputContainer}
          placeholder="Username"
          style={styles.input}
          onChangeText={(text) => {
            setValue('email', text);
          }}
        />
        <Input
          inputContainerStyle={styles.inputContainer}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setValue('password', text);
          }}
        />
        <Input
          inputContainerStyle={styles.inputContainer}
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setValue('rewritePassword', text);
          }}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Create An Account">
          Submit
        </Button>
        <Text style={styles.text2}>
          Already Have An Account?{' '}
          <Text
            style={styles.link}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Log In Here
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default Register;
