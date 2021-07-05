import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

const ChatScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
            <Text style={{textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>Chat Screen</Text>
            <Text style={{textAlign: 'center', fontSize: 25}}>Coming soon :)</Text>
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

const ChatScreenCode = () => {
    return(
        <Stack.Navigator>

        </Stack.Navigator>
    );
};

export default ChatScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08F1ED'
    },
});