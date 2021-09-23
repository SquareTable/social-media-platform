import Image from 'react-native-scalable-image';
import React from 'react';
import { View, StyleSheet } from 'react-native';

class ScalableProgressiveImage extends React.Component {
    render() {
        const Styles = StyleSheet.create({
            imageOverlay: {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
              },
              container: {
                backgroundColor: 'red'
              },
        });
        return (
            <View style={Styles.container}>
                <Image {...this.props}/>
            </View>
        );
    }
}

export default ScalableProgressiveImage;
