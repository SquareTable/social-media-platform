import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AppVar() {
  return (
    <NavigationContainer>
      <View style={styles.body_style}>
        <Text>This is the start of SquareTable's social media app</Text>
        <StatusBar style="auto" />
        <Text style={styles.test_container}>Testing</Text>
      </View>
    </NavigationContainer>
    
  );
}


const homeScreen = () => {
    return (
      <View style={{flex: 1,alignItems: "center", justifyContent: "center"}}>
      <Text>This is the start of SquareTable's social media app</Text>
      <StatusBar style="auto" />
      <Text style={{backgroundColor: '#192717',color: "white",fontWeight: "bold",}}>Testing</Text>
    </View>
    );
};

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="home" component = {homeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );
};
const styles = StyleSheet.create({
  body_style: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test_container: {
    backgroundColor: '#192717',
    color: "white",
    fontWeight: "bold",
  },
});
