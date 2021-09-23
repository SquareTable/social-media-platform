import React from 'react';
import { View, StyleSheet } from 'react-native';
import {useTheme} from "@react-navigation/native";
import Image from 'react-native-scalable-image';

const ScalableProgressiveImage = (props) => {
    const {colors, dark} = useTheme()
    const Styles = StyleSheet.create({
        imageOverlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            },
            container: {
                backgroundColor: colors.borderColor,
            },
    });
    return (
        <View style={Styles.container}>
            <Image {...props} />
        </View>
    );
}

export default ScalableProgressiveImage;
