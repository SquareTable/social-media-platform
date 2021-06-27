import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const ChatScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text>Chat Screen</Text>
            <Button
            title="Click here"
            onpress={() => alert('Button clicked!')}
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
        backgroundColor: '#377412'
    },
});