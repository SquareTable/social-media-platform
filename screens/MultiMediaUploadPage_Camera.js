import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';

const MultiMediaUploadPage_Camera = () => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    return(
        <Camera style={{flex: 1}} type={cameraType}>
            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', margin: 20}}>
                <TouchableOpacity
                    style={{flex: 0.1, alignSelf: 'flex-end', alignItems: 'center'}}
                    onPress={() => {
                    setCameraType(
                        cameraType === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    <Text style={{fontSize: 18, color: 'white'}}> Flip </Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

export default MultiMediaUploadPage_Camera;