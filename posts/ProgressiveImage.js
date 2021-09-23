import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

class ProgressiveImage extends React.Component {
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
                backgroundColor: 'yellow'
              },
        });
        return (
            <View style={Styles.container}>
                <Image {...this.props} />
            </View>
        );
    }
}

export default ProgressiveImage;
