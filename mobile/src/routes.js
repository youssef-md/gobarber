import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

export default function(logged = false) {
  return createAppContainer(
    createSwitchNavigator(
      {
        Auth: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.5)',
              style: {
                backgroundColor: '#8d41a8',
                height: 64,
                paddingTop: 10,
                borderTopColor: 'rgba(0, 0, 0, 0)',
              },
              labelStyle: {
                marginBottom: 12,
              },
            },
          },
        ),
      },
      {
        initialRouteName: logged ? 'App' : 'Auth',
      },
    ),
  );
}
