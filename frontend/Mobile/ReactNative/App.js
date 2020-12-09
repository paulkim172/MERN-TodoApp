import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './components/login.js';
import Dashboard from './components/dashboard.js';
import Register from './components/register.js';

import {isSignedIn} from './functions/authentication';

const Stack = createStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <View>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Dashboard" component={Dashboard} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

      //   <StatusBar barStyle="dark-content" />
      //   <SafeAreaView>
      //     <ScrollView
      //       contentInsetAdjustmentBehavior="automatic"
      //       style={styles.scrollView}>
      //       <Header />
      //       {global.HermesInternal == null ? null : (
      //         <View style={styles.engine}>
      //           <Text style={styles.footer}>Engine: Hermes</Text>
      //         </View>
      //       )}
      //       <View style={styles.body}>
      //         <View style={styles.sectionContainer}>
      //           <Text style={styles.sectionTitle}>Step One</Text>
      //           <Text style={styles.sectionDescription}>
      //             Edit <Text style={styles.highlight}>App.js</Text> to change
      //             this screen and then come back to see your edits.
      //           </Text>
      //         </View>
      //         <View style={styles.sectionContainer}>
      //           <Text style={styles.sectionTitle}>See Your Changes</Text>
      //           <Text style={styles.sectionDescription}>
      //             <ReloadInstructions />
      //           </Text>
      //         </View>
      //         <View style={styles.sectionContainer}>
      //           <Text style={styles.sectionTitle}>Debug</Text>
      //           <Text style={styles.sectionDescription}>
      //             <DebugInstructions />
      //           </Text>
      //         </View>
      //         <View style={styles.sectionContainer}>
      //           <Text style={styles.sectionTitle}>Learn More</Text>
      //           <Text style={styles.sectionDescription}>
      //             Read the docs to discover what to do next:
      //           </Text>
      //         </View>
      //         <LearnMoreLinks />
      //       </View>
      //     </ScrollView>
      //   </SafeAreaView>
      // </View>
    );
  }
}

export default App;
