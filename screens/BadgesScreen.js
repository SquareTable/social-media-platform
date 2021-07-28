import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, SafeAreaView, StatusBar, Dimensions, FlatList} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BadgesScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView style={{flex: 1}}>
                <View>
                <Text style={Styles.containerText}>Badges Screen</Text>
                <Text style={Styles.containerText}>This will be used for testing since it is the least of our priorities</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Text style={Styles.containerText}>Testing</Text>
                <Button
                title="Click here"
                onPress={() => alert('Button clicked!')}
                style={{
                    
                }}
                />
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
                </View>
                <View style={{height: 100}} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default BadgesScreen;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#2E3440',
        flex: 1,
    },
    containerText: {
        textAlign: 'center',
        color: '#ECEFF4'
    },  
});