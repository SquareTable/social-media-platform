import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const SettingsScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <Text>Settings Screen</Text>
            <Grid style={{height: 50}}>
                <Row style={{backgroundColor: "#927341", height: 50, maxHeight: 50, minHeight: 50}}>
                    <Text>Hi</Text>
                </Row>
                <Row style={{backgroundColor: '#384721', height: 50, maxHeight: 50, minHeight: 50}}>
                    <Text>Hi</Text>
                </Row>
            </Grid>
        </SafeAreaView>
    );
};



export default SettingsScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#08F1ED'
    },
});