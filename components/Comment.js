import React from 'react';
import { Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Container, Form, Input, Button, Label, Icon, Picker, Content, Textarea } from "native-base";

export default class CommentScreen extends React.Component {
    comInfoData = {};

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Text style={{ padding: 15, color: 'red' }}
                    onPress={() => {
                        Alert.alert(
                            'Logout Alert',
                            'Are you sure you want to logout?',
                            [
                                { text: 'Ok', onPress: () => navigation.navigate('LogoutScreen') }
                            ],
                            { cancelable: false }
                        )
                    }}>
                    LOGOUT
                </Text>
            )
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            signature: '',
            name: '',
            allData: {}
        }
    }

    componentDidMount() {
        this.setState({
            allData: this.comInfoData
        });
    }

    _submit() {
        console.log(this.state);
    }
    render() {
        const { navigation } = this.props;
        this.comInfoData = navigation.state.params.MeterAccuracy;
        console.log('All Data: ', this.state);
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Container>
                    <ScrollView>
                        <Content>
                            <Form>
                                <Label>Comment</Label>
                                <Textarea
                                    style={{ marginBottom: 8 }}
                                    rowSpan={5} bordered placeholder="Comment here..." onChangeText={
                                        (comment) => this.setState({
                                            comment
                                        })
                                    } />

                                <Label>Name and Surname</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={styles.inputStyle}
                                    onChangeText={(name) => this.setState({ name })} />

                                <Label>Sign here</Label>

                                <Button full rounded success onPress={() => {
                                    this._submit();
                                }}>
                                    <Text>Submit</Text>
                                </Button>
                            </Form>


                        </Content>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        marginTop: 30,
        paddingHorizontal: 15
    },
    inputStyle: {
        height: 35,
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        borderRadius: 3,
        marginBottom: 10,
        paddingHorizontal: 5
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