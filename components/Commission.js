import React from 'react';
import { Text, StyleSheet, TouchableOpacity, AsyncStorage, Alert, Image } from 'react-native';
import { AppService } from '../app.service';
import { Container, Item, Form, Input, Button, Label, DatePicker } from "native-base";
import { KeyboardAvoidingView, ScrollView } from 'react-native';

export default class CommissionScreen extends React.Component {
    appService = new AppService;

    today = new Date();
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
            Commissioning Technician
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
        ),
        headerLeft: null
    })

    constructor(props) {
        super(props);
        this.state = {
            commission_date: Date,
            technician_name: '',
            site_contact_name: '',
            site_address: '',
            site_description: '',
            site_type: '',
            view_number: '',
            isFormValid: false
        }
    }

    isNotEmpty() {
        return !!this.state.commission_date 
            && this.state.site_contact_name && this.state.site_address &&
            this.state.site_description && this.state.site_type && this.state.view_number;
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('user');
        let userD = JSON.parse(user);
        this.setState({
            technician_name: userD[0].name + ' ' + userD[0].surname
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
            this.props.navigation.navigate('CommissionInfoScreen',
                { CommissionData: dataObject });
            AsyncStorage.setItem('CommissioningData', JSON.stringify(dataObject));
            this.setState({
                commission_date: Date,
                site_contact_name: '',
                site_address: '',
                site_description: '',
                site_type: '',
                view_number: ''
            })
        }
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
                                    defaultDate={new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())}
                                    minimumDate={new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1)}
                                    maximumDate={new Date(2025, 12, 31)}
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
                                    value={this.state.commission_date}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>Technician Full Name *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    defaultValue={this.state.technician_name}
                                    value={this.state.technician_name} editable={false}/>
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Contact Name *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_contact_name) => this.setState({ site_contact_name })}
                                    value={this.state.site_contact_name} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Address *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_address) => this.setState({ site_address })}
                                    value={this.state.site_address} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Description *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_description) => this.setState({ site_description })}
                                    value={this.state.site_description} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Site Type *</Label>
                                <Input autoCapitalize="none" autoCorrect={false}
                                    onChangeText={(site_type) => this.setState({ site_type })}
                                    value={this.state.site_type}
                                />
                            </Item>
                            <Item floatingLabel>
                                <Label>View Number *</Label>
                                <Input
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={(view_number) => this.setState({ view_number, isFormValid: true })}
                                    value={this.state.view_number}
                                />
                            </Item>
                            <Button full rounded success style={{ marginTop: 10 }} onPress={() => {
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
        marginTop: 10
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