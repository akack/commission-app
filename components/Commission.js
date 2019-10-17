import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
// import DatePicker from 'react-native-datepicker';
import { AppService } from '../app.service';
import { Container, Item, Form, Input, Button, Label, Icon, DatePicker } from "native-base";
import { KeyboardAvoidingView, ScrollView } from 'react-native';

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
            view_number: '',
            isFormValid: false
        }
    }

    async _commissionNext() {
        let dataObject = this.state;
        this.props.navigation.navigate('CommissionInfoScreen',
            { CommissionData: dataObject });
        AsyncStorage.setItem('CommissioningData', JSON.stringify(dataObject));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <Container >
                        <Form>
                            <Item>
                                <Label>Commissioning Date *</Label>
                                <DatePicker
                                    defaultDate={new Date(2018, 4, 4)}
                                    minimumDate={new Date(2018, 1, 1)}
                                    maximumDate={new Date(2018, 12, 31)}
                                    locale={"en"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={false}
                                    animationType={"fade"}
                                    androidMode={"default"}
                                    placeHolderText="Select date"
                                    textStyle={{ color: "green" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={(commission_date) => this.setState({ commission_date })}
                                    disabled={false}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Technician Full Name *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(technician_name) => this.setState({ technician_name })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Contact Name *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_contact_name) => this.setState({ site_contact_name })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Address *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_address) => this.setState({ site_address })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Description *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_description) => this.setState({ site_description })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Type *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_type) => this.setState({ site_type })} />
                            </Item>
                            <Item floatingLabel>
                                <Label>View Number *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(view_number) => this.setState({ view_number, isFormValid: true })} />
                            </Item>
                            <Button full rounded success style={{ marginTop: 10 }} disabled={!this.state.isFormValid} onPress={() => {
                                this._commissionNext();
                            }}><Text>Next</Text></Button>
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
        padding: 10,
        marginTop: 20
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
        color: '#fff',
        borderRadius: 5,
        fontWeight: 'bold',
        margin: '5%'
    },
})