import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";

const SettingsScreen = ({navigation}) => {
    return(
        <SafeAreaView style={Styles.container}>
            <Text>Settings Screen</Text>
            <Grid style={{height: 50}}>
                <TouchableOpacity style={{backgroundColor: '#284712', height:50, width: '100%', minWidth: '100%', maxWidth: '100%'}}>
                    <Row>
                        <Text>Hi</Text>
                    </Row>
                </TouchableOpacity>
            </Grid>
            <Grid>
                <TouchableOpacity style={{backgroundColor: '#923716', height:50, width: '100%', minWidth: '100%', maxWidth: '100%'}}>
                    <Row>
                        <Text>Hi</Text>
                    </Row>
                </TouchableOpacity>
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