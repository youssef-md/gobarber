import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

import SelectProvider from './pages/NewAppointment/SelectProvider';
import SelectDateTime from './pages/NewAppointment/SelectDateTime';
import ConfirmAppointment from './pages/NewAppointment/ConfirmAppointment';

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
            NewAppointment: {
              screen: createStackNavigator(
                {
                  SelectProvider,
                  SelectDateTime,
                  ConfirmAppointment,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      paddingTop: 30,
                      marginLeft: 20,
                    },
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      paddingTop: 30,
                    },
                  },
                },
              ),
              navigationOptions: {
                tabBarVisible: false,
                tabBarLabel: 'Agendar',
                tabBarIcon: (
                  <Icon
                    name="add-circle-outline"
                    size={20}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                ),
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
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
