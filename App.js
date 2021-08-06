import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import Tabs from './navigation/tabs.js';
import styled from "styled-components";
import LoginScreen from './screens/LoginScreen.js';
import { RootStack } from './navigation/StackNavigator.js';

const Stack = createStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
};

export default App;

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
