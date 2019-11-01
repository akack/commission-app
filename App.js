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
import ForgotPassword from './components/forgotPassword';
import * as firebase from "firebase";
import Logout from './components/Logout';
import ErrorPage from './components/error';


var firebaseConfig = {
  apiKey: "AIzaSyB838AWDR2CvmqJ_ejgGTAg_gmqWr37ims",
  authDomain: "commissioning-app-71b2b.firebaseapp.com",
  databaseURL: "https://commissioning-app-71b2b.firebaseio.com",
  projectId: "commissioning-app-71b2b",
  storageBucket: "commissioning-app-71b2b.appspot.com",
  messagingSenderId: "969640997714",
  appId: "1:969640997714:web:474d2b57535aa0db3b008b",
  measurementId: "G-VHK5W26E56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppNavigator = createStackNavigator(
  {
    LogoutScreen: {
      screen: Logout, navigationOptions: {
        headerTitleStyle: { alignSelf: 'center' },
        header: null
      }
    },
    LoginScreen: {
      screen: Login, navigationOptions: {
        header: null
      }
    },
    RegisterScreen: {
      screen: Register
    },
    CommissionScreen: {
      screen: Commission,
    },
    CommissionInfoScreen: {
      screen: CommissionInfo
    },
    MeterAcuracyScreen: {
      screen: MeterAccuracy
    },
    CommentScreen: {
      screen: Comment
    },
    ForgotPasswordScreen: {
      screen: ForgotPassword
    },
    ErrorScreen: {
      screen: ErrorPage, navigationOptions: {
        headerTitleStyle: { alignSelf: 'center' },
        title: 'Error 404',
      }
    },
  },
  {
    initialRouteName: 'LoginScreen',
  }
);

export default createAppContainer(AppNavigator);