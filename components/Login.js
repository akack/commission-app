import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import { AppService } from '../app.service';

export default class LoginScreen extends React.Component {
    appService = new AppService;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isloading: false,
            emailPlaceholder: 'Email...',
            passswordPlaceholder: 'Password...'
        }
    }

    async _login() {
        this.appService.singInFireBase(this.state.email, this.state.password)
            .then(
                async (res) => {
                    this.appService.getUserDetails(res.user.uid);
                    this.props.navigation.navigate('CommissionScreen');
                    this.setState({
                        email: '',
                        password: ''
                    })
                },
                err => {
                    Alert.alert(
                        'Login Error',
                        'Invalid email / password.'
                    )
                }
            )

    }
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Text style={styles.title}> Email</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(email) => this.setState({ email })}
                        placeholder={this.state.emailPlaceholder}
                        clearButtonMode='always'
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Password</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        clearButtonMode='always'
                        placeholder={this.state.passswordPlaceholder}
                        underlineColorAndroid='transparent' />
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.forgotPassword}>
                        <Text>Forgot Password?</Text>
                    </View>
                    <View style={styles.btnSubmit}>
                        <TouchableOpacity onPress={() => {
                            this._login();
                        }}
                        >
                            <Text style={styles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={async () => {
                        this.props.navigation.navigate('RegisterScreen')
                    }}>
                        <Text style={styles.notRegisteredYet}>Not Registered Yet? Register.</Text>
                    </TouchableOpacity>
                </View>

            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    inputStyle: {
        height: 35,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 0,
        margin: 10,
        paddingLeft: 10
    },
    title: {
        marginLeft: 15,
        fontWeight: 'bold'
    },
    btnSubmit: {
        backgroundColor: 'green',
        width: "45%",
        position: 'relative',
        color: 'white',
        borderRadius: 5,
        marginLeft: 5
    },
    bottomContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 5
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        borderRadius: 5,
        fontWeight: 'bold',
        margin: '5%'
    },
    btnContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center'
    },
    notRegisteredYet: {
        marginBottom: 6,
        justifyContent: 'center',
        alignItems: 'stretch',
        color: 'green'
    }
});