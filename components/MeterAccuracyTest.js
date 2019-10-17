import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Picker } from 'react-native';
import { Container, Item, Form, Input, Button, Label, Icon } from "native-base";
import { KeyboardAvoidingView, ScrollView } from 'react-native';

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
            down_load_his_data: '',
            meter_commissioning_report: '',
            speed_test_done: '',
            ping: '',
            speed_vodacom: '',
            speed_mtn: '',
            meter: '',
            modem: '',
            netelek: '',
            speed_test_result: '',
            ct: '',
            netelek_system_op: '',
            commissionInfoData: {}
        }
    }

    componentDidMount() {
        this.setState({
            commissionInfoData: this.comInfoData
        });
    }
    async next() {
        let dataObject = this.state;
        this.props.navigation.navigate('CommentScreen',
            { MeterAccuracy: dataObject });
    }
    render() {
        const { navigation } = this.props;
        this.comInfoData = navigation.state.params.CommissionInfodata;
        console.log('ComInfo State: ', this.state);
        return (

            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView>
                    <Container >
                        <Form>
                            <View style={{ padding: 10 }}>
                                <Label>Down Load History Data</Label>
                                <Item picker>

                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        selectedValue={this.state.down_load_his_data}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ down_load_his_data: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>

                                <Label>Meter Commissioning Report</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        selectedValue={this.state.meter_commissioning_report}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ meter_commissioning_report: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>

                                <Label>Speed Test Done</Label>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={styles.picker} itemStyle={styles.pickerItem}
                                        selectedValue={this.state.speed_test_done}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ speed_test_result: itemValue })}>
                                        <Picker.Item label="Select" value="" />
                                        <Picker.Item label="Yes" value="Yes" />
                                        <Picker.Item label="No" value="No" />
                                    </Picker>
                                </Item>
                            </View>
                        </Form>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            // <View style={styles.container}>
            //     <View style={{ flexDirection: 'column', marginTop: 20 }} >
            //         <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Down Load His Data</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.down_load_his_data}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ down_load_his_data: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>

            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Meter Commissioning Report</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.meter_commissioning_report}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ meter_commissioning_report: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>

            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Speed Test Done</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.speed_test_done}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ speed_test_done: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>
            //         </View>


            //         <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Communicating/Ping</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.ping}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ ping: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>

            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Meter</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.meter}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ meter: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>

            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Modem</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.modem}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ modem: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>
            //         </View>


            //         <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Speed Test Results</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.speed_test_result}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ speed_test_result: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>

            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Current Transformers</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.ct}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ ct: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>

            //             <View style={styles.selectP}>
            //                 <Text style={styles.title}> Netelek System Operations</Text>
            //                 <Picker
            //                     style={styles.picker} itemStyle={styles.pickerItem}
            //                     selectedValue={this.state.netelek_system_op}
            //                     onValueChange={(itemValue, itemIndex) => this.setState({ netelek_system_op: itemValue })}>
            //                     <Picker.Item label="Select" value="" />
            //                     <Picker.Item label="Yes" value="Yes" />
            //                     <Picker.Item label="No" value="No" />
            //                 </Picker>
            //             </View>
            //         </View>
            //         <View style={styles.btnContainer}>
            //             <View style={styles.btnSubmit}>
            //                 <TouchableOpacity onPress={() => {
            //                     this.next();
            //                 }}>
            //                     <Text style={styles.btnText}>Next</Text>
            //                 </TouchableOpacity>
            //             </View>
            //         </View>
            //     </View>

            // </View >
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
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 0,
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