import React from 'react';
import { Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, View, AsyncStorage, Image } from 'react-native';
import { Container, Form, Input, Button, Label, Icon, Picker, Content, Textarea } from "native-base";
import { AppService } from '../app.service';
export default class CommentScreen extends React.Component {
    comInfoData = {};

    appService = new AppService;
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
            isSub: false
        }
    }


    _submit() {
        let dataObject = this.state;
        AsyncStorage.setItem('CommissioningSheetData', JSON.stringify(dataObject), async () => {
            AsyncStorage.mergeItem('CommissioningSheetData', await AsyncStorage.getItem('MeterAccurey'), () => {
                AsyncStorage.getItem('CommissioningSheetData', (err, result) => {
                    //console.log('CommissioningSheetData: ',result);
                    this.appService.StoreCommissionDataToDB(result)
                        .then(
                            res => {
                                if (res === 'true') {
                                    console.log('Submitted Data Successfully.');
                                    Alert.alert(
                                        'Success',
                                        'Successfully submitted your form. Thank you.',
                                        [
                                            { text: 'OK', onPress: () => this.props.navigation.navigate('CommissionScreen') },
                                        ],
                                        { cancelable: false }
                                    );

                                    let keys = ['CommissioningData', 'Commissioning','CommissioningSheetData'];
                                    AsyncStorage.multiRemove(keys, (err) => {
                                       console,log('Success');
                                    });
                                }
                            },
                            err => {
                                console.error(err);
                                Alert.alert(
                                    'Error',
                                    'Error submitting form, please try again later.',
                                    [
                                        { text: 'OK', onPress: () => this.props.navigation.navigate('CommissionScreen') },
                                    ],
                                    { cancelable: false }
                                );
                            }
                        )
                });
            });
        });
    }
    render() {
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
                                <View style={{ margin: 8 }}>

                                </View>
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