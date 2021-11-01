import React, {useState, useContext, useEffect} from 'react';

import { StatusBar } from 'expo-status-bar';

// formik
import {Formik} from 'formik';

// icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons';

import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    RightIcon,
    StyledInputLabel,
    StyledTextInput,
    StyledButton,
    ButtonText,
    Colors,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    AboveButtonText,
    PostHorizontalView,
    CheckBoxForPosts,
    ChangePollOptionColorView,
    ChangePollOptionColorText,
    ChangePollOptionColorButtons,
    ChangePollOptionColorButtonText,
    RedCheckBoxForColor,
    OrangeCheckBoxForColor,
    YellowCheckBoxForColor,
    GreenCheckBoxForColor,
    PurpleCheckBoxForColor
} from '../screenStylings/styling.js';
const {brand, primary, tertiary, red, orange, yellow, green, purple} = Colors;

//Axios
import axios from 'axios';

//From react native
import {View, Image, ActivityIndicator, ImageBackground, StyleSheet, ScrollView} from 'react-native';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//credentials context
import { CredentialsContext } from '../../components/CredentialsContext';
import styled from 'styled-components';
import { set } from 'react-native-reanimated';


const PollUploadPage = ({navigation}) => {
    const [optionOneColorChangeViewVisible, setOptionOneColorChangeViewVisible] = useState(true);
    const [optionOneColor, setOptionOneColor] = useState("");
    const [optionTwoColorChangeViewVisible, setOptionTwoColorChangeViewVisible] = useState(true);
    const [optionTwoColor, setOptionTwoColor] = useState("");
    const [optionThreeColorChangeViewVisible, setOptionThreeColorChangeViewVisible] = useState(true);
    const [optionThreeColor, setOptionThreeColor] = useState("");
    const [optionFourColorChangeViewVisible, setOptionFourColorChangeViewVisible] = useState(true);
    const [optionFourColor, setOptionFourColor] = useState("");
    const [optionFiveColorChangeViewVisible, setOptionFiveColorChangeViewVisible] = useState(true);
    const [optionFiveColor, setOptionFiveColor] = useState("");
    const [optionSixColorChangeViewVisible, setOptionSixColorChangeViewVisible] = useState(true);
    const [optionSixColor, setOptionSixColor] = useState("");
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [optionThreeVisible, setOptionThreeVisible] = useState(false);
    const [optionFourVisible, setOptionFourVisible] = useState(false);
    const [optionFiveVisible, setOptionFiveVisible] = useState(false);
    const [optionSixVisible, setOptionSixVisible] = useState(false);
    //context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;

    const changePollOneColorChangeView = () => {
        setOptionOneColorChangeViewVisible(true)
    }

    const changePollTwoColorChangeView = () => {
        setOptionTwoColorChangeViewVisible(true)
    }

    const changePollThreeColorChangeView = () => {
        setOptionThreeColorChangeViewVisible(true)
    }

    const changePollFourColorChangeView = () => {
        setOptionFourColorChangeViewVisible(true)
    }

    const changePollFiveColorChangeView = () => {
        setOptionFiveColorChangeViewVisible(true)
    }

    const changePollSixColorChangeView = () => {
        setOptionSixColorChangeViewVisible(true)
    }

    //change Values
    const [termsValidation, setTermsValidation] = useState(false);

    const [endLoop, setEndLoop] = useState(false);
    

    const handleCreatePost = (pollValues, setSubmitting) => {
        handleMessage(null);
        const url = "https://nameless-dawn-41038.herokuapp.com/user/createpollpost";

        axios.post(url, pollValues).then((response) => {
            const result = response.data;
            const {message, status, data} = result;

            if (status !== 'SUCCESS') {
                handleMessage(message,status);
            } else {
                handleMessage(message,status);
            }
            setSubmitting(false);

        }).catch(error => {
            console.log(error);
            setSubmitting(false);
            handleMessage("An error occured. Try checking your network connection and retry.");
        })
    }

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                    <StatusBar style="dark"/>
                    <InnerContainer>
                        <PageLogo source={require('./../../assets/icomoon-icons/IcoMoon-Free-master/PNG/64px/157-stats-bars.png')} />
                        
                        <PageTitle>Create Poll</PageTitle>
                        <Formik
                            initialValues={{pollTitle: "", pollSubTitle: "", optionOne: "", optionOnesColor: "Not Specified", optionTwo: "", optionTwosColor: "Not Specified", optionThree: "", optionThreesColor: "Not Specified", optionFour: "", optionFoursColor: "Not Specified", optionFive: "", optionFivesColor: "Not Specified", optionSix: "", optionSixesColor: "Not Specified", totalNumberOfOptions: "Two", pollCreatorId: _id}}
                            onSubmit={(values, {setSubmitting}) => {
                                if (values.pollTitle == "" || values.pollSubTitle == "" || values.optionOne == "" || values.optionTwo == "") {
                                    handleMessage('Please fill all the fields.');
                                    setSubmitting(false);
                                } else {
                                    handleCreatePost(values, setSubmitting);
                                }
                            }}
                        >
                            {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
                                <StyledFormArea theOutline={true}>
                                    <UserTextInput
                                        label="Poll Title"
                                        icon="note"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('pollTitle')}
                                        onBlur={handleBlur('pollTitle')}
                                        value={values.pollTitle}
                                    />
                                    <UserTextInput
                                        label="Poll subtitle"
                                        icon="note"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        onChangeText={handleChange('pollSubTitle')}
                                        onBlur={handleBlur('pollSubTitle')}
                                        value={values.pollSubTitle}
                                    />
                                    <AboveButtonText>Poll Options</AboveButtonText>
                                    <UserTextInput
                                        label="Option One"
                                        icon="pencil"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        isOptionOne={true}
                                        onChangeText={handleChange('optionOne')}
                                        onBlur={handleBlur('optionOne')}
                                        value={values.optionOne}
                                        setOptionOneColor={setOptionOneColor}
                                        setOptionOneColorChangeViewVisible={setOptionOneColorChangeViewVisible}
                                    />
                                    <ChangePollOptionColorView viewHidden={optionOneColorChangeViewVisible}>
                                        <ChangePollOptionColorText>Associate with color:</ChangePollOptionColorText>
                                        <PostHorizontalView>
                                            <RedCheckBoxForColor selectedState={optionOneColor} 
                                            onPress={() => {
                                                if (values.optionOnesColor !== "Red") {
                                                    values.optionOnesColor = "Red"
                                                    setOptionOneColor("Red")
                                                    console.log(values.optionOnesColor)
                                                } else {
                                                    values.optionOnesColor = "Not Specified"
                                                    setOptionOneColor("")
                                                    console.log(values.optionOnesColor)
                                                }
                                            }}></RedCheckBoxForColor>
                                            <OrangeCheckBoxForColor selectedState={optionOneColor} 
                                            onPress={() => {
                                                if (values.optionOnesColor !== "Orange") {
                                                    values.optionOnesColor = "Orange"
                                                    setOptionOneColor("Orange")
                                                    console.log(values.optionOnesColor)
                                                } else {
                                                    values.optionOnesColor = "Not Specified"
                                                    setOptionOneColor("")
                                                    console.log(values.optionOnesColor)
                                                }
                                            }}></OrangeCheckBoxForColor>
                                            <YellowCheckBoxForColor selectedState={optionOneColor} 
                                            onPress={() => {
                                                if (values.optionOnesColor !== "Yellow") {
                                                    values.optionOnesColor = "Yellow"
                                                    setOptionOneColor("Yellow")
                                                    console.log(values.optionOnesColor)
                                                } else {
                                                    values.optionOnesColor = "Not Specified"
                                                    setOptionOneColor("")
                                                    console.log(values.optionOnesColor)
                                                }
                                            }}></YellowCheckBoxForColor>
                                            <GreenCheckBoxForColor selectedState={optionOneColor} 
                                            onPress={() => {
                                                if (values.optionOnesColor !== "Green") {
                                                    values.optionOnesColor = "Green"
                                                    setOptionOneColor("Green")
                                                    console.log(values.optionOnesColor)
                                                } else {
                                                    values.optionOnesColor = "Not Specified"
                                                    setOptionOneColor("")
                                                    console.log(values.optionOnesColor)
                                                }
                                            }}></GreenCheckBoxForColor>
                                            <PurpleCheckBoxForColor selectedState={optionOneColor} 
                                            onPress={() => {
                                                if (values.optionOnesColor !== "Purple") {
                                                    values.optionOnesColor = "Purple"
                                                    setOptionOneColor("Purple")
                                                    console.log(values.optionOnesColor)
                                                } else {
                                                    values.optionOnesColor = "Not Specified"
                                                    setOptionOneColor("")
                                                    console.log(values.optionOnesColor)
                                                }
                                            }}></PurpleCheckBoxForColor>
                                        </PostHorizontalView>
                                        <ChangePollOptionColorButtons cancelButton={true} onPress={changePollOneColorChangeView}>
                                            <ChangePollOptionColorButtonText cancelButton={true}>Close</ChangePollOptionColorButtonText>
                                        </ChangePollOptionColorButtons> 
                                    </ChangePollOptionColorView>
                                    <UserTextInput
                                        label="Option Two"
                                        icon="pencil"
                                        placeholder=""
                                        placeholderTextColor={tertiary}
                                        isOptionTwo={true}
                                        onChangeText={handleChange('optionTwo')}
                                        onBlur={handleBlur('optionTwo')}
                                        value={values.optionTwo}
                                        setOptionTwoColor={setOptionTwoColor}
                                        setOptionTwoColorChangeViewVisible={setOptionTwoColorChangeViewVisible}
                                    />
                                    <ChangePollOptionColorView viewHidden={optionTwoColorChangeViewVisible}>
                                        <ChangePollOptionColorText>Associate with color:</ChangePollOptionColorText>
                                        <PostHorizontalView>
                                            <RedCheckBoxForColor selectedState={optionTwoColor} 
                                            onPress={() => {
                                                if (values.optionTwosColor !== "Red") {
                                                    values.optionTwosColor = "Red"
                                                    setOptionTwoColor("Red")
                                                    console.log(values.optionTwosColor)
                                                } else {
                                                    values.optionTwosColor = "Not Specified"
                                                    setOptionTwoColor("")
                                                    console.log(values.optionTwosColor)
                                                }
                                            }}></RedCheckBoxForColor>
                                            <OrangeCheckBoxForColor selectedState={optionTwoColor} 
                                            onPress={() => {
                                                if (values.optionTwosColor !== "Orange") {
                                                    values.optionTwosColor = "Orange"
                                                    setOptionTwoColor("Orange")
                                                    console.log(values.optionTwosColor)
                                                } else {
                                                    values.optionTwosColor = "Not Specified"
                                                    setOptionTwoColor("")
                                                    console.log(values.optionTwosColor)
                                                }
                                            }}></OrangeCheckBoxForColor>
                                            <YellowCheckBoxForColor selectedState={optionTwoColor} 
                                            onPress={() => {
                                                if (values.optionTwosColor !== "Yellow") {
                                                    values.optionTwosColor = "Yellow"
                                                    setOptionTwoColor("Yellow")
                                                    console.log(values.optionTwosColor)
                                                } else {
                                                    values.optionTwosColor = "Not Specified"
                                                    setOptionTwoColor("")
                                                    console.log(values.optionTwosColor)
                                                }
                                            }}></YellowCheckBoxForColor>
                                            <GreenCheckBoxForColor selectedState={optionTwoColor} 
                                            onPress={() => {
                                                if (values.optionTwosColor !== "Green") {
                                                    values.optionTwosColor = "Green"
                                                    setOptionTwoColor("Green")
                                                    console.log(values.optionTwosColor)
                                                } else {
                                                    values.optionTwosColor = "Not Specified"
                                                    setOptionTwoColor("")
                                                    console.log(values.optionTwosColor)
                                                }
                                            }}></GreenCheckBoxForColor>
                                            <PurpleCheckBoxForColor selectedState={optionTwoColor} 
                                            onPress={() => {
                                                if (values.optionTwosColor !== "Purple") {
                                                    values.optionTwosColor = "Purple"
                                                    setOptionTwoColor("Purple")
                                                    console.log(values.optionTwosColor)
                                                } else {
                                                    values.optionTwosColor = "Not Specified"
                                                    setOptionTwoColor("")
                                                    console.log(values.optionTwosColor)
                                                }
                                            }}></PurpleCheckBoxForColor>
                                        </PostHorizontalView>
                                        <ChangePollOptionColorButtons cancelButton={true} onPress={changePollTwoColorChangeView}>
                                            <ChangePollOptionColorButtonText cancelButton={true}>Close</ChangePollOptionColorButtonText>
                                        </ChangePollOptionColorButtons> 
                                    </ChangePollOptionColorView>
                                    <StyledFormArea visibility={optionThreeVisible}>
                                        <UserTextInput
                                            label="Option Three"
                                            icon="pencil"
                                            placeholder=""
                                            placeholderTextColor={tertiary}
                                            isOptionThree={true}
                                            onChangeText={handleChange('optionThree')}
                                            onBlur={handleBlur('optionThree')}
                                            value={values.optionThree}
                                            setOptionThreeColor={setOptionThreeColor}
                                            setOptionThreeColorChangeViewVisible={setOptionThreeColorChangeViewVisible}
                                        />
                                        <ChangePollOptionColorView viewHidden={optionThreeColorChangeViewVisible}>
                                            <ChangePollOptionColorText>Associate with color:</ChangePollOptionColorText>
                                            <PostHorizontalView>
                                                <RedCheckBoxForColor selectedState={optionThreeColor} 
                                                onPress={() => {
                                                    if (values.optionThreesColor !== "Red") {
                                                        values.optionThreesColor = "Red"
                                                        setOptionThreeColor("Red")
                                                        console.log(values.optionThreesColor)
                                                    } else {
                                                        values.optionThreesColor = "Not Specified"
                                                        setOptionThreeColor("")
                                                        console.log(values.optionThreesColor)
                                                    }
                                                }}></RedCheckBoxForColor>
                                                <OrangeCheckBoxForColor selectedState={optionThreeColor} 
                                                onPress={() => {
                                                    if (values.optionThreesColor !== "Orange") {
                                                        values.optionThreesColor = "Orange"
                                                        setOptionThreeColor("Orange")
                                                        console.log(values.optionThreesColor)
                                                    } else {
                                                        values.optionThreesColor = "Not Specified"
                                                        setOptionThreeColor("")
                                                        console.log(values.optionThreesColor)
                                                    }
                                                }}></OrangeCheckBoxForColor>
                                                <YellowCheckBoxForColor selectedState={optionThreeColor} 
                                                onPress={() => {
                                                    if (values.optionThreesColor !== "Yellow") {
                                                        values.optionThreesColor = "Yellow"
                                                        setOptionThreeColor("Yellow")
                                                        console.log(values.optionThreesColor)
                                                    } else {
                                                        values.optionThreesColor = "Not Specified"
                                                        setOptionThreeColor("")
                                                        console.log(values.optionThreesColor)
                                                    }
                                                }}></YellowCheckBoxForColor>
                                                <GreenCheckBoxForColor selectedState={optionThreeColor} 
                                                onPress={() => {
                                                    if (values.optionThreesColor !== "Green") {
                                                        values.optionThreesColor = "Green"
                                                        setOptionThreeColor("Green")
                                                        console.log(values.optionThreesColor)
                                                    } else {
                                                        values.optionThreesColor = "Not Specified"
                                                        setOptionThreeColor("")
                                                        console.log(values.optionThreesColor)
                                                    }
                                                }}></GreenCheckBoxForColor>
                                                <PurpleCheckBoxForColor selectedState={optionThreeColor} 
                                                onPress={() => {
                                                    if (values.optionThreesColor !== "Purple") {
                                                        values.optionThreesColor = "Purple"
                                                        setOptionThreeColor("Purple")
                                                        console.log(values.optionThreesColor)
                                                    } else {
                                                        values.optionThreesColor = "Not Specified"
                                                        setOptionThreeColor("")
                                                        console.log(values.optionThreesColor)
                                                    }
                                                }}></PurpleCheckBoxForColor>
                                            </PostHorizontalView>
                                            <ChangePollOptionColorButtons cancelButton={true} onPress={changePollThreeColorChangeView}>
                                                <ChangePollOptionColorButtonText cancelButton={true}>Close</ChangePollOptionColorButtonText>
                                            </ChangePollOptionColorButtons> 
                                        </ChangePollOptionColorView>
                                    </StyledFormArea>
                                    <StyledFormArea visibility={optionFourVisible}>
                                        <UserTextInput
                                            label="Option Four"
                                            icon="pencil"
                                            placeholder=""
                                            placeholderTextColor={tertiary}
                                            isOptionFour={true}
                                            onChangeText={handleChange('optionFour')}
                                            onBlur={handleBlur('optionFour')}
                                            value={values.optionFour}
                                            setOptionFourColor={setOptionFourColor}
                                            setOptionFourColorChangeViewVisible={setOptionFourColorChangeViewVisible}
                                        />
                                        <ChangePollOptionColorView viewHidden={optionFourColorChangeViewVisible}>
                                            <ChangePollOptionColorText>Associate with color:</ChangePollOptionColorText>
                                            <PostHorizontalView>
                                                <RedCheckBoxForColor selectedState={optionFourColor} 
                                                onPress={() => {
                                                    if (values.optionFoursColor !== "Red") {
                                                        values.optionFoursColor = "Red"
                                                        setOptionFourColor("Red")
                                                        console.log(values.optionFoursColor)
                                                    } else {
                                                        values.optionFoursColor = "Not Specified"
                                                        setOptionFourColor("")
                                                        console.log(values.optionFoursColor)
                                                    }
                                                }}></RedCheckBoxForColor>
                                                <OrangeCheckBoxForColor selectedState={optionFourColor} 
                                                onPress={() => {
                                                    if (values.optionFoursColor !== "Orange") {
                                                        values.optionFoursColor = "Orange"
                                                        setOptionFourColor("Orange")
                                                        console.log(values.optionFoursColor)
                                                    } else {
                                                        values.optionFoursColor = "Not Specified"
                                                        setOptionFourColor("")
                                                        console.log(values.optionFoursColor)
                                                    }
                                                }}></OrangeCheckBoxForColor>
                                                <YellowCheckBoxForColor selectedState={optionFourColor} 
                                                onPress={() => {
                                                    if (values.optionFoursColor !== "Yellow") {
                                                        values.optionFoursColor = "Yellow"
                                                        setOptionFourColor("Yellow")
                                                        console.log(values.optionFoursColor)
                                                    } else {
                                                        values.optionFoursColor = "Not Specified"
                                                        setOptionFourColor("")
                                                        console.log(values.optionFoursColor)
                                                    }
                                                }}></YellowCheckBoxForColor>
                                                <GreenCheckBoxForColor selectedState={optionFourColor} 
                                                onPress={() => {
                                                    if (values.optionFoursColor !== "Green") {
                                                        values.optionFoursColor = "Green"
                                                        setOptionFourColor("Green")
                                                        console.log(values.optionFoursColor)
                                                    } else {
                                                        values.optionFoursColor = "Not Specified"
                                                        setOptionFourColor("")
                                                        console.log(values.optionFoursColor)
                                                    }
                                                }}></GreenCheckBoxForColor>
                                                <PurpleCheckBoxForColor selectedState={optionFourColor} 
                                                onPress={() => {
                                                    if (values.optionFoursColor !== "Purple") {
                                                        values.optionFoursColor = "Purple"
                                                        setOptionFourColor("Green")
                                                        console.log(values.optionFoursColor)
                                                    } else {
                                                        values.optionFoursColor = "Not Specified"
                                                        setOptionFourColor("")
                                                        console.log(values.optionFoursColor)
                                                    }
                                                }}></PurpleCheckBoxForColor>
                                            </PostHorizontalView>
                                            <ChangePollOptionColorButtons cancelButton={true} onPress={changePollFourColorChangeView}>
                                                <ChangePollOptionColorButtonText cancelButton={true}>Close</ChangePollOptionColorButtonText>
                                            </ChangePollOptionColorButtons> 
                                        </ChangePollOptionColorView>
                                    </StyledFormArea>
                                    <StyledFormArea visibility={optionFiveVisible}>
                                        <UserTextInput
                                            label="Option Five"
                                            icon="pencil"
                                            placeholder=""
                                            placeholderTextColor={tertiary}
                                            isOptionFive={true}
                                            onChangeText={handleChange('optionFive')}
                                            onBlur={handleBlur('optionFive')}
                                            value={values.optionFive}
                                            setOptionFiveColor={setOptionFiveColor}
                                            setOptionFiveColorChangeViewVisible={setOptionFiveColorChangeViewVisible}
                                        />
                                        <ChangePollOptionColorView viewHidden={optionFiveColorChangeViewVisible}>
                                            <ChangePollOptionColorText>Associate with color:</ChangePollOptionColorText>
                                            <PostHorizontalView>
                                                <RedCheckBoxForColor selectedState={optionFiveColor} 
                                                onPress={() => {
                                                    if (values.optionFivesColor !== "Red") {
                                                        values.optionFivesColor = "Red"
                                                        setOptionFiveColor("Red")
                                                        console.log(values.optionFivesColor)
                                                    } else {
                                                        values.optionFivesColor = "Not Specified"
                                                        setOptionFiveColor("")
                                                        console.log(values.optionFivesColor)
                                                    }
                                                }}></RedCheckBoxForColor>
                                                <OrangeCheckBoxForColor selectedState={optionFiveColor} 
                                                onPress={() => {
                                                    if (values.optionFivesColor !== "Orange") {
                                                        values.optionFivesColor = "Orange"
                                                        setOptionFiveColor("Orange")
                                                        console.log(values.optionFivesColor)
                                                    } else {
                                                        values.optionFivesColor = "Not Specified"
                                                        setOptionFiveColor("")
                                                        console.log(values.optionFivesColor)
                                                    }
                                                }}></OrangeCheckBoxForColor>
                                                <YellowCheckBoxForColor selectedState={optionFiveColor} 
                                                onPress={() => {
                                                    if (values.optionFivesColor !== "Yellow") {
                                                        values.optionFivesColor = "Yellow"
                                                        setOptionFiveColor("Yellow")
                                                        console.log(values.optionFivesColor)
                                                    } else {
                                                        values.optionFivesColor = "Not Specified"
                                                        setOptionFiveColor("")
                                                        console.log(values.optionFivesColor)
                                                    }
                                                }}></YellowCheckBoxForColor>
                                                <GreenCheckBoxForColor selectedState={optionFiveColor} 
                                                onPress={() => {
                                                    if (values.optionFivesColor !== "Green") {
                                                        values.optionFivesColor = "Green"
                                                        setOptionFiveColor("Green")
                                                        console.log(values.optionFivesColor)
                                                    } else {
                                                        values.optionFivesColor = "Not Specified"
                                                        setOptionFiveColor("")
                                                        console.log(values.optionFivesColor)
                                                    }
                                                }}></GreenCheckBoxForColor>
                                                <PurpleCheckBoxForColor selectedState={optionFiveColor} 
                                                onPress={() => {
                                                    if (values.optionFivesColor !== "Purple") {
                                                        values.optionFivesColor = "Purple"
                                                        setOptionFiveColor("Purple")
                                                        console.log(values.optionFivesColor)
                                                    } else {
                                                        values.optionFivesColor = "Not Specified"
                                                        setOptionFiveColor("")
                                                        console.log(values.optionFivesColor)
                                                    }
                                                }}></PurpleCheckBoxForColor>
                                            </PostHorizontalView>
                                            <ChangePollOptionColorButtons cancelButton={true} onPress={changePollFiveColorChangeView}>
                                                <ChangePollOptionColorButtonText cancelButton={true}>Close</ChangePollOptionColorButtonText>
                                            </ChangePollOptionColorButtons> 
                                        </ChangePollOptionColorView>
                                    </StyledFormArea>
                                    <StyledFormArea visibility={optionSixVisible}>
                                        <UserTextInput
                                            label="Option Six"
                                            icon="pencil"
                                            placeholder=""
                                            placeholderTextColor={tertiary}
                                            isOptionSix={true}
                                            onChangeText={handleChange('optionSix')}
                                            onBlur={handleBlur('optionSix')}
                                            value={values.optionSix}
                                            setOptionSixColor={setOptionSixColor}
                                            setOptionSixColorChangeViewVisible={setOptionSixColorChangeViewVisible}
                                        />
                                        <ChangePollOptionColorView viewHidden={optionSixColorChangeViewVisible}>
                                            <ChangePollOptionColorText>Associate with color:</ChangePollOptionColorText>
                                            <PostHorizontalView>
                                                <RedCheckBoxForColor selectedState={optionSixColor} 
                                                onPress={() => {
                                                    if (values.optionSixesColor !== "Red") {
                                                        values.optionSixesColor = "Red"
                                                        setOptionSixColor("Red")
                                                        console.log(values.optionSixesColor)
                                                    } else {
                                                        values.optionSixesColor = "Not Specified"
                                                        setOptionSixColor("")
                                                        console.log(values.optionSixesColor)
                                                    }
                                                }}></RedCheckBoxForColor>
                                                <OrangeCheckBoxForColor selectedState={optionSixColor} 
                                                onPress={() => {
                                                    if (values.optionSixesColor !== "Orange") {
                                                        values.optionSixesColor = "Orange"
                                                        setOptionSixColor("Orange")
                                                        console.log(values.optionSixesColor)
                                                    } else {
                                                        values.optionSixesColor = "Not Specified"
                                                        setOptionSixColor("")
                                                        console.log(values.optionSixesColor)
                                                    }
                                                }}></OrangeCheckBoxForColor>
                                                <YellowCheckBoxForColor selectedState={optionSixColor} 
                                                onPress={() => {
                                                    if (values.optionSixesColor !== "Yellow") {
                                                        values.optionSixesColor = "Yellow"
                                                        setOptionSixColor("Yellow")
                                                        console.log(values.optionSixesColor)
                                                    } else {
                                                        values.optionSixesColor = "Not Specified"
                                                        setOptionSixColor("")
                                                        console.log(values.optionSixesColor)
                                                    }
                                                }}></YellowCheckBoxForColor>
                                                <GreenCheckBoxForColor selectedState={optionSixColor} 
                                                onPress={() => {
                                                    if (values.optionSixesColor !== "Green") {
                                                        values.optionSixesColor = "Green"
                                                        setOptionSixColor("Green")
                                                        console.log(values.optionSixesColor)
                                                    } else {
                                                        values.optionSixesColor = "Not Specified"
                                                        setOptionSixColor("")
                                                        console.log(values.optionSixesColor)
                                                    }
                                                }}></GreenCheckBoxForColor>
                                                <PurpleCheckBoxForColor selectedState={optionSixColor} 
                                                onPress={() => {
                                                    if (values.optionSixesColor !== "Purple") {
                                                        values.optionSixesColor = "Purple"
                                                        setOptionSixColor("Purple")
                                                        console.log(values.optionSixesColor)
                                                    } else {
                                                        values.optionSixesColor = "Not Specified"
                                                        setOptionSixColor("")
                                                        console.log(values.optionSixesColor)
                                                    }
                                                }}></PurpleCheckBoxForColor>
                                            </PostHorizontalView>
                                            <ChangePollOptionColorButtons cancelButton={true} onPress={changePollSixColorChangeView}>
                                                <ChangePollOptionColorButtonText cancelButton={true}>Close</ChangePollOptionColorButtonText>
                                            </ChangePollOptionColorButtons> 
                                        </ChangePollOptionColorView>
                                    </StyledFormArea>
                                    <PostHorizontalView centerAlign={true}>
                                        <TextLink addPollText={true} onPress={() => {
                                            if (optionThreeVisible == false) {
                                                setOptionThreeVisible(true)
                                                values.totalNumberOfOptions= "Three"
                                            } else if (optionFourVisible == false) {
                                                setOptionFourVisible(true)
                                                values.totalNumberOfOptions= "Four"
                                            } else if (optionFiveVisible == false) {
                                                setOptionFiveVisible(true)
                                                values.totalNumberOfOptions= "Five"
                                            } else if (optionSixVisible == false) {
                                                setOptionSixVisible(true)
                                                values.totalNumberOfOptions= "Six"
                                            } else {
                                                handleMessage("Max options reached","FAILED");
                                            }
                                        }}>
                                            <TextLinkContent addPollText={true}>+ Add Option   </TextLinkContent>
                                        </TextLink>
                                        <TextLink removePollText={true} onPress={() => {
                                            if (optionSixVisible == true) {
                                                setOptionSixVisible(false)
                                                values.totalNumberOfOptions = "Five"
                                            } else if (optionFiveVisible == true) {
                                                setOptionFiveVisible(false)
                                                values.totalNumberOfOptions = "Four"
                                            } else if (optionFourVisible == true) {
                                                setOptionFourVisible(false)
                                                values.totalNumberOfOptions = "Three"
                                            } else if (optionThreeVisible == true) {
                                                setOptionThreeVisible(false)
                                                values.totalNumberOfOptions = "Two"
                                            } else {
                                                handleMessage("A poll requiares a minimum of 2 options","FAILED");
                                            }
                                        }}>
                                            <TextLinkContent removePollText={true}>- Remove Option</TextLinkContent>
                                        </TextLink>
                                    </PostHorizontalView>
                                    <MsgBox type={messageType}>{message}</MsgBox>
                                    {!isSubmitting && (<StyledButton onPress={handleSubmit}>
                                        <ButtonText> Submit </ButtonText>
                                    </StyledButton>)}

                                    {isSubmitting && (<StyledButton disabled={true}>
                                        <ActivityIndicator size="large" color={primary} />
                                    </StyledButton>)}
                                    
                                    <StyledButton signUpButton={true} onPress={() => navigation.navigate("PostScreen")}>
                                            <ButtonText signUpButton={true}> Back </ButtonText>
                                    </StyledButton>
                                </StyledFormArea>)}
                        </Formik>
                    </InnerContainer>

            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center"
    }
})

const UserTextInput = ({
    label, 
    icon, 
    optionOneColor, 
    setOptionOneColor,
    optionOneColorChangeViewVisible,
    setOptionOneColorChangeViewVisible,
    optionTwoColor, 
    setOptionTwoColor,
    optionTwoColorChangeViewVisible,
    setOptionTwoColorChangeViewVisible,
    optionThreeColor, 
    setOptionThreeColor,
    optionThreeColorChangeViewVisible,
    setOptionThreeColorChangeViewVisible,
    optionFourColor, 
    setOptionFourColor,
    optionFourColorChangeViewVisible,
    setOptionFourColorChangeViewVisible,
    optionFiveColor, 
    setOptionFiveColor,
    optionFiveColorChangeViewVisible,
    setOptionFiveColorChangeViewVisible,
    optionSixColor, 
    setOptionSixColor,
    optionSixColorChangeViewVisible,
    setOptionSixColorChangeViewVisible,
    isOptionOne,
    isOptionTwo,
    isOptionThree,
    isOptionFour,
    isOptionFive,
    isOptionSix,
    hidePassword,
    selectedOptionForColor,
    setSelectedOptionForColor,
    ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props}/>
            {isOptionOne && (
                <RightIcon onPress={() => setOptionOneColorChangeViewVisible(false)}>
                    <Ionicons name={'color-palette-outline'} size={30} color={brand}/>
                </RightIcon>
            )}
            {isOptionTwo && (
                <RightIcon onPress={() => setOptionTwoColorChangeViewVisible(false)}>
                    <Ionicons name={'color-palette-outline'} size={30} color={brand}/>
                </RightIcon>
            )}
            {isOptionThree && (
                <RightIcon onPress={() => setOptionThreeColorChangeViewVisible(false)}>
                    <Ionicons name={'color-palette-outline'} size={30} color={brand}/>
                </RightIcon>
            )}
            {isOptionFour && (
                <RightIcon onPress={() => setOptionFourColorChangeViewVisible(false)}>
                    <Ionicons name={'color-palette-outline'} size={30} color={brand}/>
                </RightIcon>
            )}
            {isOptionFive && (
                <RightIcon onPress={() => setOptionFiveColorChangeViewVisible(false)}>
                    <Ionicons name={'color-palette-outline'} size={30} color={brand}/>
                </RightIcon>
            )}
            {isOptionSix && (
                <RightIcon onPress={() => setOptionSixColorChangeViewVisible(false)}>
                    <Ionicons name={'color-palette-outline'} size={30} color={brand}/>
                </RightIcon>
            )}
        </View>
    )
}

export default PollUploadPage;
