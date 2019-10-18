import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Container, Form, Input, Button, Label, Icon, Picker, Content } from "native-base";
import { KeyboardAvoidingView, ScrollView } from 'react-native';
const Item = Picker.Item;
export default class MeterAccuracyTest extends React.Component {
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
            meter: 'No',
            modem: 'No',
            netelek: 'No',
            speed_test_result: 'No',
            ct: 'No',
            netelek_system_op: 'No',
            reading_optical_eye: '',
            reading_software: ''
        }
    }
    isNotEmpty() {
        return !!this.state.meter && this.state.modem && this.state.netelek
            && this.state.speed_test_result && this.state.ct && this.state.netelek_system_op &&
            this.state.reading_optical_eye && this.state.reading_software;
    }
    onNetelekSystemOpChange(value) {
        this.setState({
            netelek_system_op: value
        })
    }

    onCTChange(value) {
        this.setState({
            ct: value
        })
    }

    onSpeedTestResultChange(value) {
        this.setState({
            speed_test_result: value
        })
    }

    onNetelekChange(value) {
        this.setState({
            netelek: value
        })
    }

    onModemChange(value) {
        this.setState({
            modem: value
        })
    }

    onMeterChange(value) {
        this.setState({
            meter: value
        })
    }

    async next() {
        if (!this.isNotEmpty()) {
            Alert.alert(
                'Required Fileds',
                'Field(s) marked with * are required.'
            )
        } else {
            let dataObject = this.state;
            this.props.navigation.navigate('CommentScreen',
                { MeterAccuracy: dataObject });

            AsyncStorage.setItem('MeterAccurey', JSON.stringify(dataObject), async () => {
                AsyncStorage.mergeItem('MeterAccurey', await AsyncStorage.getItem('Commissioning'), () => {
                    AsyncStorage.getItem('MeterAccurey', (err, result) => {
                        // console.log('data: ',result);
                    });
                });
            });
            this.setState({
                reading_optical_eye: '',
                reading_software: ''
            })
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Container >
                    <ScrollView>
                        <Content style={{ marginBottom: 15 }}>
                            <Form>
                                <Label>Reading on Optical Eye *</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={styles.inputStyle}
                                    onChangeText={(reading_optical_eye) => this.setState({ reading_optical_eye })}
                                    value={this.state.reading_optical_eye} />

                                <Label>Reading On Software *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(reading_software) => this.setState({ reading_software })}
                                    value={this.state.reading_software} />

                                <Label>Meter *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.meter}
                                    onValueChange={this.onMeterChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Modem *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.modem}
                                    onValueChange={this.onModemChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Netelek *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.netelek}
                                    onValueChange={this.onNetelekChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Speed Test Result *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.speed_test_result}
                                    onValueChange={this.onSpeedTestResultChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Current Transfomers *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.ct}
                                    onValueChange={this.onCTChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Netelek System Operational *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.netelek_system_op}
                                    onValueChange={this.onNetelekSystemOpChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>


                                <View style={{ marginTop: 10 }} >
                                    <Button full rounded success onPress={() => {
                                        this.next();
                                    }}><Text>Next</Text></Button>
                                </View>
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
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    inputStyle: {
        height: 35,
        borderBottomColor: 'green',
        borderBottomWidth: 1,
        borderRadius: 3,
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
    },
    picker: {

        height: 30,
        borderWidth: 1,
        padding: 10,
        margin: 5
    },
    pickerItem: {
        color: 'red'
    },
});