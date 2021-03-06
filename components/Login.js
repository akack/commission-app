import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Image } from 'react-native';
import { AppService } from '../app.service';
import { Container, Item, Form, Input, Button, Label, Spinner } from "native-base";
export default class LoginScreen extends React.Component {
    appService = new AppService;
    error = false;
    isLoadin = false;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isloading: false,
            emailPlaceholder: 'Email...',
            passswordPlaceholder: 'Password...',
            err: false
        }
        this._login = this._login.bind(this);
    }

    isEmptyNotField() {
        return !!this.state.email && !!this.state.password;
    }

    goToError = () => {
        this.props.navigation.navigate('ErrorScreen');
    }

    _login = async () => {
        if (!this.isEmptyNotField()) {
            Alert.alert(
                'Required Fileds',
                'Field(s) marked with * are required.'
            )
        } else {
            this.appService.singInFireBase(this.state.email, this.state.password)
                .then(
                    (res) => {
                        this.setState({
                            isloading: true
                        })
                        this.appService.getUserDetails(res.user.uid)
                            .then(
                                res => {
                                    if (res === true) {
                                        this.setState({
                                            email: '',
                                            password: '',
                                            isloading: false
                                        });
                                        this.props.navigation.navigate('CommissionScreen');
                                    } else {
                                        this.setState({
                                            isloading: false
                                        })
                                        Alert.alert(
                                            'Error Login',
                                            'Something went wrong, Please try again later.',
                                            [{
                                                text: 'Ok', onPress: () => {
                                                    this.setState({
                                                        email: '',
                                                        password: ''
                                                    })
                                                }
                                            }]

                                        )
                                    }
                                },
                                err => {
                                    this.setState({
                                        isloading: false
                                    })
                                    Alert.alert(
                                        'Error Login',
                                        'Something went wrong, Please try again later.',
                                        [{
                                            text: 'Ok', onPress: () => {
                                                this.setState({
                                                    email: '',
                                                    password: ''
                                                })
                                            }
                                        }]

                                    )
                                }
                            )
                    },
                    err => {
                        console.log(err)
                        Alert.alert(
                            'Login Error',
                            'Invalid email / password.'
                        )
                    }
                )
        }

    }
    render() {
        if (this.state.isloading) {
            <View style={styles.container}>
                <Spinner color='green' />
            </View>
        }
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <ScrollView>
                    <Container style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'stretch',
                        backgroundColor: '#fff',
                        textAlign: 'center',
                        paddingHorizontal: 15
                    }}>
                        <View style={{
                            justifyContent: 'center',
                            textAlign: 'center',
                            alignItems: 'center',
                            marginBottom: 15,
                            flexDirection: 'column',
                        }}>
                            <Image source={require('../assets/img/logo.png')} resizeMode={'center'} style={{ width: 120, height: 120 }} />
                        </View>
                        <Label style={{ justifyContent: 'center', textAlign: 'center', fontSize: 14 }}>Field(s) marked with * are required.</Label>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email *</Label>
                                <Input autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="always"
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password *</Label>
                                <Input
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="always"
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>
                            <Button full rounded success style={{ marginTop: 20 }} onPress={() => {
                                this._login();
                            }}>
                                <Text>SignIn</Text>
                            </Button>

                            <Button full rounded info style={{ marginTop: 20 }} onPress={() => {
                                this.props.navigation.navigate('RegisterScreen');
                            }}>
                                <Text>Signup</Text>
                            </Button>
                            <View style={styles.forgotPassword} >
                                <TouchableOpacity onPress={() => {
                                    this.props.navigation.navigate('ForgotPasswordScreen');
                                }}>
                                    <Text>Forgot Password?</Text>
                                </TouchableOpacity>
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
    errMesage: {
        fontSize: 18,
        color: 'red'
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