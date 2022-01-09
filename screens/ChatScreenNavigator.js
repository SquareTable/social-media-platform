import React, {useRef} from 'react';
import {View, Text, Animated, useWindowDimensions} from 'react-native';
import { useTheme } from '@react-navigation/native';

const ChatScreenNavigator = () => {
    const {colors} = useTheme()
    const TranslateY = useRef(new Animated.Value(0)).current;
    const Scale = useRef(new Animated.Value(1)).current;
    const Rotate = useRef(new Animated.Value(0)).current;
    const {height} = useWindowDimensions();
    Animated.loop(
        Animated.sequence([
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(TranslateY, {
                        toValue: -height / 7,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                    Animated.timing(TranslateY, {
                        toValue: height / 8,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ]),
                Animated.sequence([
                    Animated.timing(Scale, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                    Animated.timing(Scale, {
                        toValue: 1.1,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                ])
            ]),
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(Rotate, {
                        toValue: 6.25,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                    Animated.timing(Rotate, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ]),
                Animated.sequence([
                    Animated.timing(TranslateY, {
                        toValue: height / 8,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                    Animated.timing(TranslateY, {
                        toValue: height / 6,
                        duration: 1000,
                        useNativeDriver: true
                    })
                ]),
                Animated.sequence([
                    Animated.timing(Scale, {
                        toValue: 0.5,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                    Animated.timing(Scale, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true
                    }),
                ])
            ])
        ])
    ).start()
    return(
        <Animated.View style={{flex: 1, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', transform: [{translateY: TranslateY}, {scale: Scale}, {rotate: Rotate}]}}>
            <Text style={{color: colors.tertiary, fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginTop: 40}}>Stay tuned for something awesome</Text>
            <Text style={{color: colors.tertiary, fontSize: 100, fontWeight: 'bold', textAlign: 'center', marginTop: 20}}>😃</Text>
        </Animated.View>
    )
}

export default ChatScreenNavigator;