import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AppService } from '../app.service';

import { Container, Item, Form, Input, Button, Label } from "native-base";
import { KeyboardAvoidingView, ScrollView } from 'react-native';

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
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <Container >
                        <Form>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(name) => this.setState({ name })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Surname</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(surname) => this.setState({ surname })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Company</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(company) => this.setState({ company })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Tel</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(tel) => this.setState({ tel })} />
                            </Item>
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
                            <Item floatingLabel>
                                <Label>Confirm Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(confirm) => this.setState({ confitm })}
                                />
                            </Item>
                            <Button full rounded success style={{ marginTop: 10 }} onPress={() => {
                                this._registerUser();
                            }}>
                                <Text>Signup</Text>
                            </Button>

                            <Button full rounded info style={{ marginTop: 10 }} onPress={() => {
                                this.props.navigation.navigate('LoginScreen')
                            }}>
                                <Text>Signin</Text>
                            </Button>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'stretch',
        padding: 15
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