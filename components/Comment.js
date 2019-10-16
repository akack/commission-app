import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';



export default class CommentScreen extends React.Component {
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
            comment: '',
            signature: '',
            allData: {}
        }
    }

    componentDidMount() {
        this.setState({
            allData: this.comInfoData
        });
    }

    _submit() {
        console.log(this.state);
    }
    render() {
        const { navigation } = this.props;
        this.comInfoData = navigation.state.params.MeterAccuracy;
        console.log('All Data: ', this.state);
        return (
            <View style={styles.container}>
                <View >
                    <Text style={styles.title}> Comment</Text>
                    <TextInput style={styles.inputStyle}
                        multiline={true} numberOfLines={10}
                        onChangeText={(comment) => this.setState({ comment })}
                        placeholder='Comment here'
                        underlineColorAndroid='transparent' />
                </View>

                <View >
                    <Text style={styles.title}> Manager Signature</Text>

                </View>
                <View style={styles.btnContainer}>

                    <View style={styles.btnSubmit}>
                        <TouchableOpacity onPress={() => {
                            this._submit();
                        }}
                        >
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View >
        );
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
        height: 120,
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
    }
});