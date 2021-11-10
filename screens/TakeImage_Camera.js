import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Camera} from 'expo-camera';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

const TakeImage_Camera = ({navigation, route}) => {
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [cameraIsReady, setCameraIsReady] = useState(false)
    const [cameraIsInPreview, setCameraIsInPreview] = useState(false)
    const [image, setImage] = useState(null)
    const cameraRef = useRef()
    const {locationToGoTo} = route.params;
    console.log('Camera Is ready value is ' + cameraIsReady)

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: false };
            const data = await cameraRef.current.takePictureAsync(options);
            //const source = data.base64;
            console.log(data)
            setImage(data)

            if (data) {
                await cameraRef.current.pausePreview();
                setCameraIsInPreview(true);
            }
        }
    };

    const retakeImage = async () => {
        await cameraRef.current.resumePreview();
        setCameraIsInPreview(false)
    }

    const chooseImage = () => {
        console.log('Choosing image')
        if (image) {
            navigation.navigate(locationToGoTo, {imageFromRoute: image})
        } else {
            alert('An error occured')
        }
    }
    return(
        <>
            <View style={{height: screenHeight / 4, minHeight: screenHeight / 4, maxHeight: screenHeight / 4, backgroundColor: 'black'}}/>
            <Camera style={{flex: 1, width: screenWidth, minWidth: screenWidth, maxWidth: screenWidth, height: screenWidth, minHeight: screenWidth, maxHeight: screenWidth}} type={cameraType} ratio={'1:1'} onCameraReady={() => {setCameraIsReady(true)}} ref={cameraRef}/>
            <View style={{flex: 1, backgroundColor: 'black', flexDirection: 'row'}}>
                    {cameraIsInPreview == false &&
                        <>
                            <TouchableOpacity 
                                disabled={!cameraIsReady}
                                onPress={() => {
                                    setCameraType(
                                        cameraType === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                    );
                                }}
                                style={{flex: 0.3, alignSelf: 'flex-end', alignItems: 'center', paddingBottom: 25}}
                            >
                                <MaterialIcons name='flip-camera-ios' size={50} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={!cameraIsReady}
                                onPress={takePicture}
                                style={{flex: 0.4, alignSelf: 'flex-end', alignItems: 'center'}}
                            >
                                <Image source={require('../assets/TakePhotoImg.png')} style={{width: 100, height: 100}}/>
                            </TouchableOpacity>
                        </>
                    }
                    {cameraIsInPreview == true &&
                        <>
                            <View style={{flex: 1, backgroundColor: 'transparent', flexDirection: 'row', margin: 20}}>
                                <TouchableOpacity 
                                    onPress={retakeImage}
                                    style={{flex: 0.5, alignSelf: 'flex-end', alignItems: 'center'}}
                                >
                                    <View style={{width: 80, height: 80, backgroundColor: 'black', borderRadius: 10000, borderWidth: 1, borderColor: 'black', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{fontSize: 50}}>❌</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={chooseImage}
                                    style={{flex: 0.5, alignSelf: 'flex-end', alignItems: 'center'}}
                                >
                                    <View style={{width: 80, height: 80, backgroundColor: 'black', borderRadius: 10000, borderWidth: 1, borderColor: 'black', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{fontSize: 50}}>✅</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
        </>
    );
}

export default TakeImage_Camera;