import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const SettingsScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text>Settings Screen</Text>
            <Button
            title="Click here"
            onPress={() => alert('Button clicked!')}
            />
        </View>
    );
};

export default SettingsScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08F1ED'
    },
});