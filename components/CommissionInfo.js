import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Container, Form, Input, Button, Label, Icon, Picker, Content } from "native-base";
const Item = Picker.Item;
export default class CommissionInfoScreen extends React.Component {
    comData = {};

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
            meter_number: '',
            Antenna: 'No',
            CT_Visible: 'No',
            CT_Ratio: '',
            APN_correct: 'No',
            meter_type: '',
            modem_number: '',
            sim_card_no: '',
            meter_physical_location: 'No',
            CommissionData: {},
            meter_report: 'No',
            selectedItem: undefined
        }
    }

    onAntennaChange(value) {
        this.setState({
            Antenna: value
        });
    }
    onCTVisibleChange(value) {
        this.setState({
            CT_Visible: value
        });
    }
    onAPNCorrectChange(value) {
        this.setState({
            APN_correct: value
        })
    }
    onMeterReportChange(value) {
        this.setState({
            meter_report: value
        })
    }

    componentDidMount() {
        this.setState({
            CommissionData: this.comData
        })
    }

    async _commissionNext() {
        let dataObject = this.state;
        this.props.navigation.navigate('MeterAcuracyScreen',
            { CommissionInfodata: dataObject });
    }

    render() {
        const { navigation } = this.props;
        this.comData = navigation.state.params.CommissionData;
        console.log('State: ', this.state);
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Container>
                    <ScrollView >
                        <Content style={{marginBottom:15}}>
                            <Form>
                                <Label>Meter Number</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={styles.inputStyle}
                                    onChangeText={(meter_number) => this.setState({ meter_number })} />

                                <Label>Meter Type </Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(meter_type) => this.setState({ meter_type })} />

                                <Label>Moden Number</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(modem_number) => this.setState({ modem_number })} />

                                <Label>Sim Card Number</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(sim_card_no) => this.setState({ sim_card_no })} />

                                <Label>Meter Physical Location</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(meter_physical_location) => this.setState({ meter_physical_location })} />

                                <Label>CT Ratio</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(CT_Ratio) => this.setState({ CT_Ratio })} />

                                <Label>Antenna</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.Antenna}
                                    onValueChange={this.onAntennaChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>CT Visible</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.CT_Visible}
                                    onValueChange={this.onCTVisibleChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>APN Correct</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.APN_correct}
                                    onValueChange={this.onAPNCorrectChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>
                                <Label>Meter Report</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.meter_report}
                                    onValueChange={this.onMeterReportChange.bind(this)}>
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <View style={{ marginTop: 10 }} >
                                    <Button full rounded style={{ backgroundColor: 'green' }} onPress={() => {
                                        this._commissionNext();
                                    }}><Text style={styles.btnText}>Next</Text></Button>
                                </View>
                            </Form>
                        </Content>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        )
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
    selectP: {
        flexDirection: 'column'
    },
    inputStyle: {
        height: 35,
        borderBottomColor:'green',
        borderBottomWidth: 1,
        borderRadius: 3,
        margin: 10,
        paddingLeft: 10
    },
    title: {
        marginLeft: 5,
        fontWeight: 'bold'
    },
    btnContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        alignItems: 'center',
        marginTop: 30
    },
    btnSubmit: {
        backgroundColor: 'green',
        width: "45%",
        position: 'relative',
        color: 'white',
        borderRadius: 5,
        marginLeft: 5
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        borderRadius: 5,
        fontWeight: 'bold',
        margin: '5%'
    },
    picker: {
        height: 30,
        borderWidth: 1,
        padding: 10
    },
    pickerItem: {
        color: 'red'
    },
})