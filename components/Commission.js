import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { AppService } from '../app.service';
export default class CommissionScreen extends React.Component {
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
            commission_date: '',
            technician_name: '',
            site_contact_name: '',
            site_address: '',
            site_description: '',
            site_type: '',
            view_number: ''
        }
    }

    async _commissionNext() {
        let dataObject = this.state;
        this.props.navigation.navigate('CommissionInfoScreen',
            { CommissionData: dataObject });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', marginTop: 20 }} >
                    <Text style={styles.title}> Commission Date</Text>
                    <DatePicker
                        style={{ width: '90%', margin: 10, }}
                        date={this.state.commission_date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(commission_date) => { this.setState({ commission_date: commission_date }) }}
                    />

                    <Text style={styles.title}> Technician Name</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(technician_name) => this.setState({ technician_name })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Site Contact Name</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(site_contact_name) => this.setState({ site_contact_name })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Site Address</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(site_address) => this.setState({ site_address })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}>Site Description</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(site_description) => this.setState({ site_description })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> Site Type</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(site_type) => this.setState({ site_type })}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.title}> View Number</Text>
                    <TextInput style={styles.inputStyle}
                        onChangeText={(view_number) => this.setState({ view_number })}
                        underlineColorAndroid='transparent' />
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
        alignItems: 'center'
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
})