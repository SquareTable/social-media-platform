import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView, Switch} from 'react-native';

const AccountSettings = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: '#ECEFF4'}}>Account Screen</Text>
            <Text style={{textAlign: 'center', fontSize: 25, color: '#ECEFF4'}}>Coming soon :)</Text>
            <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#ECEFF4'}}>Add account privacy settings here</Text>
            <View style={{height: 20, maxHeight: 20, minHeight: 20, width: '100%', minWidth: '100%', maxWidth: '100%'}}/>
            <Image
                source={require('../assets/doge.gif')}
                resizeMode = 'contain'
                style={{
                    width: 200,
                    height: 200,
                    paddingLeft: '50%',
                    paddingRight: '50%'
                }}
            />
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountSettings;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3440'
    },
});