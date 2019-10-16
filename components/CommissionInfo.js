import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';

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
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', marginTop: 20 }} >

                    <Text style={styles.title}>Meter Number</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(meter_number) => this.setState({ meter_number })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}>Meter Type</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(meter_type) => this.setState({ meter_type })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}>Modem Number</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(modem_number) => this.setState({ modem_number })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}>Sim Card Number</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(sim_card_no) => this.setState({ sim_card_no })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Meter Physical Location</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(meter_physical_location) => this.setState({ meter_physical_location })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> CT Ratio</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(CT_Ratio) => this.setState({ CT_Ratio })}
                        underlineColorAndroid='transparent' />

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={styles.selectP}>
                            <Text style={styles.title}> Antenna</Text>
                            <Picker
                                style={styles.picker} itemStyle={styles.pickerItem}
                                selectedValue={this.state.Antenna}
                                onValueChange={(itemValue, itemIndex) => this.setState({ Antenna: itemValue })}>
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>

                        <View style={styles.selectP}>
                            <Text style={styles.title}> CT Visible</Text>
                            <Picker
                                style={styles.picker} itemStyle={styles.pickerItem}
                                selectedValue={this.state.CT_Visible}
                                onValueChange={(itemValue, itemIndex) => this.setState({ CT_Visible: itemValue })}>
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                        <View style={styles.selectP}>
                            <Text style={styles.title}> APN Correct</Text>
                            <Picker
                                selectedValue={this.state.APN_correct}
                                style={styles.picker} itemStyle={styles.pickerItem}
                                onValueChange={(itemValue, itemIndex) => this.setState({ APN_correct: itemValue })}>
                                <Picker.Item label="Select" value="" />
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                        {/* 
                        <View style={styles.selectP}>
                            <Text style={styles.title}> Meter Report</Text>
                            <Picker
                                selectedValue={this.state.APN_correct}
                                style={styles.picker} itemStyle={styles.pickerItem}
                                onValueChange={(itemValue, itemIndex) => this.setState({ meter_report: itemValue })}>
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View> */}
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.btnSubmit}>
                        <TouchableOpacity onPress={() => {
                            this._commissionNext();
                        }}>
                            <Text style={styles.btnText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
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
        width: 100,
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
    },
    pickerItem: {
        color: 'red'
    },
})