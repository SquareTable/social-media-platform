import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';

const LoginScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#ECEFF4'}}>Login Screen</Text>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#ECEFF4'}}>COMING SOONNNNNNNN</Text>
            <Image
                source={require('../assets/doge.gif')}
                resizeMode = 'contain'
                style={{
                    width: 200,
                    height: 200
                }}
            />
        </View>
    );
};

export default LoginScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2E3440'
    },
});