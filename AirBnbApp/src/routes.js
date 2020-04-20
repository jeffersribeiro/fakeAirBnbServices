import * as React from 'react';
import {Alert, Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import Main from './pages/main';

const Stack = createStackNavigator();

class Routes extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: false,
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            options={{
              title: false,
              headerTransparent: true,
            }}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{
              headerTitle: props => <View {...props} />,
              headerRight: () => (
                <Button
                  onPress={() => Alert.alert('This is a button!')}
                  title="Info"
                  color="#fff"
                />
              ),
            }}
            name="Main"
            component={Main}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Routes;
