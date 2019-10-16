import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { AppService } from '../app.service';

import { Container, Item, Form, Input, Button, Label } from "native-base";

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
                    this.setState({
                        email: '',
                        password: ''
                    });
                    this.props.navigation.navigate('CommissionScreen');
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
            <KeyboardAvoidingView behavior="padding" enabled>
                <ScrollView>
                    <Container style={styles.container}>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(password) => this.setState({ password })}
                                />
                            </Item>
                            <Button full rounded style={{ marginTop: 20 }} onPress={() => {
                                this._login();
                            }}>
                                <Text>SignIn</Text>
                            </Button>

                            <Button full rounded success style={{ marginTop: 20 }} onPress={() => {
                                this.props.navigation.navigate('RegisterScreen');
                            }}>
                                <Text>Signup</Text>
                            </Button>
                            <View style={styles.forgotPassword}>
                                <Text>Forgot Password?</Text>
                            </View>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    forgotPassword: {
        padding: 10,
        marginTop: 5,
        color: 'blue'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        padding: 10
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