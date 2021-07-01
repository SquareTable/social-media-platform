import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';

const PostScreen = ({navigation}) => {
    return(
        <View style={Styles.container}>
            <Text>Profile Screen</Text>
            <Button
            title="Click here"
            onPress={() => alert('Button clicked!')}
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

export default PostScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08F1ED'
    },
});