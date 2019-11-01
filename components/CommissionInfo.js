import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, AsyncStorage, Image,TouchableOpacity} from 'react-native';
import { Container, Form, Input, Button, Label, Picker, Content } from "native-base";
const Item = Picker.Item;
export default class CommissionInfoScreen extends React.Component {
    comData = {};

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
            Commissioning Information
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
            meter_number: '',
            Antenna: '',
            CT_Visible: '',
            CT_Ratio: '',
            APN_correct: '',
            meter_type: '',
            modem_number: '',
            sim_card_no: '',
            meter_physical_location: '',
            meter_report: 'No',
            speed_test_done: '',
            ping: '',
            speed_vodacom: '',
            speed_mtn: '',
            port_number: '',
            meter_commissioning_report: '',
            down_load_his_data: '',
            gms_signal: ''
        }
    }

    isNotEmpty() {
        return !!this.state.meter_number && this.state.Antenna && this.state.CT_Visible && this.state.CT_Ratio
            && this.state.APN_correct && this.state.meter_type && this.state.modem_number && this.state.sim_card_no
            && this.state.meter_physical_location && this.state.meter_report && this.state.speed_test_done && this.state.ping
            && this.state.speed_vodacom && this.state.speed_mtn && this.state.port_number && this.state.meter_commissioning_report
            && this.state.down_load_his_data && this.state.gms_signal;
    }
    onMeterComReport(value) {
        this.setState({
            meter_commissioning_report: value
        })
    }

    onDownlodaDataChange(value) {
        this.setState({
            down_load_his_data: value
        })
    }

    onPingChange(value) {
        this.setState({
            ping: value
        })
    }

    onSpeedTestDone(value) {
        this.setState({
            speed_test_done: value
        })
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
    onGSMSignalChange(value) {
        this.setState({
            gms_signal: value
        })
    }
    async _commissionNext() {
        if (!this.isNotEmpty()) {
            Alert.alert(
                'Required Fileds',
                'Field(s) marked with * are required.'
            )
        } else {
            let dataObject = this.state;
            this.props.navigation.navigate('MeterAcuracyScreen',
                { CommissionInfodata: dataObject });

            AsyncStorage.setItem('Commissioning', JSON.stringify(dataObject), async () => {
                AsyncStorage.mergeItem('Commissioning', await AsyncStorage.getItem('CommissioningData'), () => {
                    AsyncStorage.getItem('Commissioning', (err, result) => {
                        // console.log(result);
                        this.setState({
                            meter_number: '',
                            Antenna: '',
                            CT_Visible: '',
                            CT_Ratio: '',
                            APN_correct: '',
                            meter_type: '',
                            modem_number: '',
                            sim_card_no: '',
                            meter_physical_location: '',
                            meter_report: 'No',
                            speed_test_done: '',
                            ping: '',
                            speed_vodacom: '',
                            speed_mtn: '',
                            port_number: '',
                            meter_commissioning_report: '',
                            down_load_his_data: ''
                        })
                    });
                });
            });
        }

    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Container>
                    <ScrollView >
                        <Content style={{ marginBottom: 15 }}>
                            <Form>
                                <Label>Meter Number *</Label>
                                <Input autoCapitalize="none" autoCorrect={false} style={styles.inputStyle}
                                    onChangeText={(meter_number) => this.setState({ meter_number })}
                                    value={this.state.meter_number} />

                                <Label>Meter Type *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(meter_type) => this.setState({ meter_type })} />

                                <Label>Modem Number *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(modem_number) => this.setState({ modem_number })} />

                                <Label>Sim Card Number *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(sim_card_no) => this.setState({ sim_card_no })} />

                                <Label>Meter Physical Location *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(meter_physical_location) => this.setState({ meter_physical_location })} />

                                <Label>CT Ratio *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(CT_Ratio) => this.setState({ CT_Ratio })} />

                                <Label>Speed Vodacom *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(speed_vodacom) => this.setState({ speed_vodacom })} />

                                <Label>Speed Recorded MTN *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(speed_mtn) => this.setState({ speed_mtn })} />

                                <Label>Port Number *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    style={styles.inputStyle}
                                    onChangeText={(port_number) => this.setState({ port_number })} />

                                <Label>Antenna *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.Antenna}
                                    onValueChange={this.onAntennaChange.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>CT Visible *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.CT_Visible}
                                    onValueChange={this.onCTVisibleChange.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>APN Correct *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.APN_correct}
                                    onValueChange={this.onAPNCorrectChange.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>
                                <Label>Meter Commissioning Report *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.meter_commissioning_report}
                                    onValueChange={this.onMeterComReport.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Speed Test Done *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.speed_test_done}
                                    onValueChange={this.onSpeedTestDone.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Communicating/Ping *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.ping}
                                    onValueChange={this.onPingChange.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>Down Load History Data *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.down_load_his_data}
                                    onValueChange={this.onDownlodaDataChange.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>

                                <Label>GSM Signal "ON" *</Label>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={this.state.gms_signal}
                                    onValueChange={this.onGSMSignalChange.bind(this)}>
                                    <Item label="Select" value="" />
                                    <Item label="Yes" value="Yes" />
                                    <Item label="No" value="No" />
                                </Picker>


                                <View style={{ marginTop: 10 }} >
                                    <Button full rounded success onPress={() => {
                                        this._commissionNext();
                                    }}><Text>Next</Text></Button>
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
        borderBottomColor: 'green',
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