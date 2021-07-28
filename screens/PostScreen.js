import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, Switch} from 'react-native';

const PostScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', color: '#ECEFF4'}}>Post Screen</Text>
            <Text style={{textAlign: 'center', fontSize: 20, color: '#ECEFF4'}}>Coming soon :)</Text>
            <View style={{height: 20, maxHeight: 20, minHeight: 20, width: '100%', maxWidth: '100%', minWidth: '100%'}}/>
            <Image
                source={require('../assets/doge.gif')}
                resizeMode = 'contain'
                style={{
                    width: 200,
                    height: 200, paddingLeft: '50%', paddingRight: '50%'
                }}
            />
        </SafeAreaView>
    );
};

export default PostScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E3440'
    },
});