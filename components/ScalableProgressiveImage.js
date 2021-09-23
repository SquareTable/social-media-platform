import Image from 'react-native-scalable-image';
import React from 'react';
import { View, StyleSheet, Dimensions} from 'react-native';

class ScalableProgressiveImage extends React.Component {
    render() {
        return (
            <View>
                <Image
                    {...this.props}
                />
            </View>
        );
    }
}

export default ScalableProgressiveImage;
