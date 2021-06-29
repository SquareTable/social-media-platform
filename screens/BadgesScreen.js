import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, SafeAreaView, StatusBar, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BadgesScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView style={Styles.ScrollView}>
                <Text style={Styles.containerItems}>Badges Screen</Text>
                <Text>This will also be used as a testing screen as badges are the least of our priorities</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
                <Text>Test</Text>
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default BadgesScreen;

const Styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#08F1ED',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    scrollView: {
        width: screenWidth,
    },
    containerItems: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },  
});