import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.body_style}>
      <Text>Chat screen here</Text>
      <StatusBar style="auto" />
      <Text style={styles.test_container}>Testing</Text>
    </View>
    
  );
}
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
