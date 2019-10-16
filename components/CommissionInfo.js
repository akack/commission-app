import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Container, Item, Form, Input, Button, Label, Icon, Picker } from "native-base";

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
            Antenna: '',
            CT_Visible: '',
            CT_Ratio: '',
            APN_correct: '',
            meter_type: '',
            modem_number: '',
            sim_card_no: '',
            meter_physical_location: '',
            CommissionData: {}
        }

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
                <ScrollView>
                    <Container >
                        <Form>
                            <Item floatingLabel>
                                <Label>Meter Number</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(meter_number) => this.setState({ meter_number })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Meter Type </Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(meter_type) => this.setState({ meter_type })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Moden Number</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(modem_number) => this.setState({ modem_number })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Sim Card Number</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(sim_card_no) => this.setState({ sim_card_no })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Meter Physical Location</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(meter_physical_location) => this.setState({ meter_physical_location })} />
                            </Item>
                            <Item floatingLabel style={{ marginBottom: 10 }}>
                                <Label>CT Ratio</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(CT_Ratio) => this.setState({ CT_Ratio })} />
                            </Item>
                            <View style={{ padding: 10 }}>
                                <Item picker>
                                    <Label>Antenna</Label>
                                    <Picker
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        selectedValue={this.state.Antenna}
                                        placeholder="Select Antenna"
                                        onValueChange={(itemValue, itemIndex) => this.setState({ Antenna: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>

                                <Item picker>
                                    <Label>CT Visible</Label>
                                    <Picker
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        selectedValue={this.state.CT_Visible}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ CT_Visible: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>

                                <Item picker>
                                    <Label>APN Correct</Label>
                                    <Picker
                                        selectedValue={this.state.APN_correct}
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ APN_correct: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>

                                <Item picker>
                                    <Label>Meter Report</Label>
                                    <Picker
                                        selectedValue={this.state.meter_report}
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ meter_report: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>
                                <Button full rounded style={{ marginTop: 10, backgroundColor: 'green' }} onPress={() => {
                                this._commissionNext();
                            }}><Text style={styles.btnText}>Next</Text></Button>
                            </View> 
                        </Form>
                    </Container>
                </ScrollView>
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
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 0,
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