import React from 'react';
import { Text, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, View, AsyncStorage, Image, TouchableOpacity } from 'react-native';
import { Container, Form, Input, Button, Label, Icon, Picker, Content, Textarea } from "native-base";
import { AppService } from '../app.service';

export default class CommentScreen extends React.Component {
    comInfoData = {};

    appService = new AppService;
    static navigationOptions = ({ navigation }) => ({
        headerTitle: <Text style={{
            alignSelf: 'center',
            fontSize: 18,
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            fontWeight: 'bold'
        }}>
            Submission
        </Text>,
        headerRight: (
            <TouchableOpacity style={{ padding: 15, color: 'red' }}
                onPress={() => {
                    Alert.alert(
                        'Logout Alert',
                        'Are you sure you want to logout?',
                        [
                            { text: 'Ok', onPress: () => navigation.navigate('LogoutScreen') },
                            { text: 'Cancel', onPress: () => console.log('Canceled') }

                        ],
                        { cancelable: false }
                    )

                }}>
                <Image source={require('../assets/img/logout.jpg')} style={{ width: 35, height: 35, paddingVertical: 10 }} />
            </TouchableOpacity>
        )
    })
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            authorised_name: '',
            isSub: false,
            uidFB: ''
        }
        this._submit = this._submit.bind(this);
    }

    isNotEmpty() {
        return !!this.state.comment && this.state.authorised_name;
    }

    _submit = async () => {
        if (!this.isNotEmpty()) {
            Alert.alert(
                'Required Fileds',
                'Field(s) marked with * are required.'
            )
        } else {
            let user = await AsyncStorage.getItem('user');
            let userD = JSON.parse(user);
            this.setState({
                uidFB: userD[0].uidFB
            })
            let dataObject = this.state;
            AsyncStorage.setItem('CommissioningSheetData', JSON.stringify(dataObject), async () => {
                AsyncStorage.mergeItem('CommissioningSheetData', await AsyncStorage.getItem('MeterAccurey'), () => {
                    AsyncStorage.getItem('CommissioningSheetData', (err, result) => {
                        //console.log('CommissioningSheetData: ',result);
                        this.appService.StoreCommissionDataToDB(JSON.parse(result))
                            .then(
                                async res => {
                                    if (res === true) {
                                        console.log('Submitted Data Successfully.');
                                        Alert.alert(
                                            'Success',
                                            'Successfully submitted your form. Thank you.',
                                            [
                                                {
                                                    text: 'OK', onPress: () => {
                                                        this.props.navigation.navigate('CommissionScreen');
                                                        this.setState({
                                                            comment: '',
                                                            authorised_name: '',
                                                            isSub: false,
                                                            uidFB: ''
                                                        })
                                                    }
                                                },
                                            ],
                                            { cancelable: false }
                                        );

                                        let keys = ['CommissioningData', 'Commissioning', 'CommissioningSheetData'];
                                        await AsyncStorage.multiRemove(keys, (err) => {
                                            console.log('deleted keys successfully');
                                        });
                                    } else {
                                        Alert.alert(
                                            'Error Submitting Sheet',
                                            'Something went wrong, Please try again later.',
                                            [{
                                                text: 'Ok', onPress: () => {
                                                    console.log('Error submitting data.')
                                                }
                                            }]

                                        )
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
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Container>
                    <ScrollView>
                        <Content>
                            <Form>
                                <Label>Comment *</Label>
                                <Textarea
                                    style={{ marginBottom: 8 }}
                                    rowSpan={5} bordered placeholder="Comment here..." onChangeText={
                                        (comment) => this.setState({
                                            comment
                                        })
                                    } />

                                <Label>Authorised Person: Fullname *</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={styles.inputStyle}
                                    onChangeText={(authorised_name) => this.setState({ authorised_name })} />


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