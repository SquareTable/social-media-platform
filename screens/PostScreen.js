import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const PostScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text>Post Screen</Text>
            <Button
            title="Click here"
            onpress={() => alert('Button clicked!')}
            />
        </View>
    );
};

export default PostScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#377412'
    },
});