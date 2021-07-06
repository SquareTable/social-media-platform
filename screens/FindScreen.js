import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, ScrollView} from 'react-native';

const FindScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>Find Screen</Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>Coming soon :)</Text>
            <View style={{height: 20, maxHeight: 20, minHeight: 20, width: '100%', maxWidth: '100%', minWidth: '100%'}}/>
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

export default FindScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08F1ED'
    },
});