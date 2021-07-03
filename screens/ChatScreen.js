import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';

const ChatScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
            <Text style={{textAlign: 'center'}}>Chat Screen</Text>
            <View style={{maxWidth: 70, maxHeight: 70, alignContent: 'center', alignItems: 'center'}}>
                <Button
                title="Click here - Andrew"
                onPress={() => alert('ANDREW IS A NONCE')}
                />
            </View>
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