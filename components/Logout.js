import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage , Alert} from 'react-native';
import { AppService } from '../app.service';

export default class LogoutScreen extends React.Component {
    appService = new AppService;
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.appService.logout()
        .then(
            res => {
                console.log('Logged out successfully');
                this.props.navigation.navigate('LoginScreen');
            } 
            ,err => {
                console.error(err);
            }
        )
    }
   
    render() {
        return (
            <View>
            </View >
        );
    }
}