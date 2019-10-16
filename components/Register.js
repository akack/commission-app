import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppService } from '../app.service';

export default class RegisterScreen extends React.Component {
    appService = new AppService;
    isPasswordMatch = false;
    emailExist = false;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirm: '',
            name: '',
            surname: '',
            company: '',
            tel: '',
            uidFB: ''
        }
    }

    _registerUser() {
        if (this.passwordMatch()) {
            this.setState({
                isPasswordMatch: true
            });
            this.appService.signUpFireBase(this.state.email, this.state.password)
                .then(
                    res => {
                        this.setState({
                            uidFB: res.user.uid
                        });
                        this.appService.addUserToDB(this.state);
                        this.props.navigation.navigate('LoginScreen');
                    },
                    err => {
                        if (err.message === 'The email address is already in use by another account.') {
                            Alert.alert(
                                'Email Error',
                                'The email address is already in use by another account.'
                            )
                        }
                    }
                )
        } else {
            Alert.alert(
                'Password Error',
                'TPasswords do not match.'
            )
        }
    }
    passwordMatch() {
        return this.state.password === this.state.confirm;
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', marginTop: 20 }} >
                    <Text style={styles.title}> Name</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(name) => this.setState({ name })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Surname</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(surname) => this.setState({ surname })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Company</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(company) => this.setState({ company })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Tel</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(tel) => this.setState({ tel })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Email</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(email) => this.setState({ email })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Password</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(password) => this.setState({ password })}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}>Confirm Password</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(confirm) => this.setState({ confirm })}
                        secureTextEntry={true}
                        underlineColorAndroid='transparent' />
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity onPress={async () => {
                            this.props.navigation.navigate('LoginScreen')
                        }}>
                            <Text style={styles.notRegisteredYet}>Already Registered? Login.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.btnSubmit}>
                        <TouchableOpacity onPress={() => {
                            this._registerUser();
                        }}>
                            <Text style={styles.btnText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
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
        flexDirection: 'row',
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