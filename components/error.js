import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'native-base';

export default class ErrorScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Text style={{ padding: 15, color: 'red' }}
                    onPress={() => {
                        Alert.alert(
                            'Logout Alert',
                            'Are you sure you want to logout?',
                            [
                                { text: 'Ok', onPress: () => navigation.navigate('LoginScreen') }

                            ],
                            { cancelable: false }
                        )

                    }}>
                    Login
                </Text>
            )
        };
    }
    constructor(props) {
        super(props);
    }
    goBack =()=> {
        this.props.navigation.navigate('LoginScreen');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    marginBottom: 15,
                    flexDirection: 'column',
                }}>
                    <Image source={require('../assets/img/erro.jpg')} resizeMode={'center'} style={{ width: 120, height: 120 }} />
                </View>
                <Text style={{textAlign: 'center'}}>Error loading page, Please try again later.</Text>
                <Button full bordered success info style={{ marginTop: 20 }} onPress={() => {
                  this.goBack()
                }}>
                    <Text>Go back to login</Text>
                </Button>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },

});