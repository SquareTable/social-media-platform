import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView} from 'react-native';

const ChatScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text>Chat Screen</Text>
            <Button
            title="Click here - Andrew"
            onPress={() => alert('ANDREW IS A NONCE')}
            />
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

export default ChatScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08F1ED'
    },
});