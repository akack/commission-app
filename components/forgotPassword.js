import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { AppService } from '../app.service';

import { Container, Item, Form, Input, Button, Label } from "native-base";

export default class ForgotPasswordScreen extends React.Component {
    appService = new AppService;
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isValid: false
        }
    }

    async _submitEmail() {
        this.appService.passwordRecovery(this.state.email)
            .then(
                async (res) => {
                    Alert.alert(
                        'Email Submitted',
                        'Recovery link will be sent to your email.'
                    )
                    this.props.navigation.navigate('LoginScreen');
                    console.log('Success');
                },
                err => {
                    Alert.alert(
                        'Email Error',
                        'Seems your email is incorrect or not registered with us, Please check your email and try again.'
                    )
                }
            )
    }
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <ScrollView>
                    <Container style={styles.container}>
                        <Label style={{ justifyContent: 'center', textAlign: 'center' }}>Field(s) marked with * are required.</Label>
                        <Form>
                            <Item floatingLabel>
                                <Label>Email *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(email) => this.setState({ email, isValid:true })} />
                            </Item>

                            <Button full rounded success style={{ marginTop: 20 }}  disabled={!this.state.isValid}   onPress={() => {
                                this._submitEmail();
                            }}>
                                <Text>Submit</Text>
                            </Button>

                            <Button full rounded info style={{ marginTop: 20 }} onPress={() => {
                                this.props.navigation.navigate('LoginScreen');
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