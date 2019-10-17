import React from 'react';
import { View, Text, TextInput, Icon, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './components/Login';
import Register from './components/Register';
import Commission from './components/Commission';
import CommissionInfo from './components/CommissionInfo';
import MeterAccuracy from './components/MeterAccuracyTest';
import Comment from './components/Comment';
import * as firebase from "firebase";
import Logout from './components/Logout';

var firebaseConfig = {
  apiKey: "AIzaSyCoom1l7P-rrOaDbasLqOlH-cBtJ4nRyi0",
  authDomain: "commission-52434.firebaseapp.com",
  databaseURL: "https://commission-52434.firebaseio.com",
  projectId: "commission-52434",
  storageBucket: "commission-52434.appspot.com",
  messagingSenderId: "713183661530",
  appId: "1:713183661530:web:6266422a25b462739b04e3",
  measurementId: "G-RH5VT8Q8LZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppNavigator = createStackNavigator(
  {
    LogoutScreen: {
      screen: Logout, navigationOptions: {
        header: null
      }
    },
    LoginScreen: {
      screen: Login, navigationOptions: {
        header: null
      }
    },
    RegisterScreen: {
      screen: Register, navigationOptions: {
        title: 'Registration',
      }
    },
    CommissionScreen: {
      screen: Commission, navigationOptions: {
        title: 'Onsite Technician Details',

      }
    },
    CommissionInfoScreen: {
      screen: CommissionInfo, navigationOptions: {
        title: 'Commission Information',
      }
    },
    MeterAcuracyScreen: {
      screen: MeterAccuracy, navigationOptions: {
        title: 'Meter Accuracy Test',
      }
    },
    CommentScreen: {
      screen: Comment, navigationOptions: {
        title: 'Submition',
      }
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

export default createAppContainer(AppNavigator);