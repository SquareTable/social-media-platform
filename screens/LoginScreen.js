import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';

const LoginScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#ECEFF4'}}>Login Screen</Text>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#ECEFF4'}}>COMING SOONNNNNNNN</Text>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#ECEFF4'}}>Press the doge gif to temporarily login</Text>
            <TouchableOpacity onPressIn={() => navigation.replace('Profile Name Here')}>
                <Image
                    source={require('../assets/doge.gif')}
                    resizeMode = 'contain'
                    style={{
                        width: 200,
                        height: 200
                    }}
                />
            </TouchableOpacity>
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