import { StyleSheet} from 'react-native';
import styled from "styled-components/native";
import Constants from "expo-constants";

var darkModeOn = true;

/* Transfer all settings pages over to the dark mode switching system */

var darkModeStyling = StyleSheet.create({
    textColor: {
        color: '#ECEFF4'
    },
    oppositeTextColor: {
        color: '#2E3440'
    },
    tintColor: {
        tintColor: '#ECEFF4'
    },
    oppositeTintColor: {
        tintColor: '#2E3440'
    },
    borderColor: {
        borderColor: '#ECEFF4'
    },
    backgroundColor: {
        backgroundColor: '#2E3440'
    },
    oppositeBackgroundColor: {
        backgroundColor: '#ECEFF4'
    },
    navBackgroundColor: {
        backgroundColor: '#3B4252'
    },
    navFocusedColor: {
        color: '#88C0D0'
    },
    settingsButtonTouchableOpacity: {
        backgroundColor: '#3B4252', 
        width: '40%', 
        maxWidth: '40%', 
        minWidth: '40%', 
        height: 50, 
        maxHeight: 50, 
        minHeight: 50, 
        borderColor: '#5E81AC', 
        borderWidth: 5, 
        borderRadius: 50/2, 
        marginLeft: '5%', 
        marginRight: '5%'
    },
    settingsButtonText: {
        color: '#ECEFF4',
        fontSize: 14, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    like_comment_save_buttons: {
        minHeight: 40, 
        minWidth: 40, 
        width: 40, 
        height: 40, 
        maxWidth: 40, 
        maxHeight: 40, 
        position:'absolute', 
        left:15
    },
    ProfileTopBtn_Left: {
        position: 'absolute',
        zIndex: 100,
        width: '10%',
        backgroundColor: '#2E3440',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 5,
        height: 40,
        right: '35%',
        flex: 5,
        width: 40,
        height: 40
    },
    ProfileTopBtn_Right: {
        position: 'absolute',
        zIndex: 100,
        width: '10%',
        backgroundColor: '#2E3440',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 5,
        height: 40,
        left: '35%',
        flex: 5,
        width: 40,
        height: 40
    }
})

var lightModeStyling = StyleSheet.create({
    textColor: {
        color: '#2E3440'
    },
    oppositeTextColor: {
        color: '#ECEFF4'
    },
    tintColor: {
        tintColor: '#2E3440'
    },
    oppositeTintColor: {
        tintColor: '#ECEFF4'
    },
    borderColor: {
        borderColor: '#2E3440'
    },
    backgroundColor: {
        backgroundColor: '#ECEFF4'
    },
    oppositeBackgroundColor: {
        backgroundColor: '#2E3440'
    },
    navBackgroundColor: {
        backgroundColor: '#D8DEE9'
    },
    settingsButtonTouchableOpacity: {
        backgroundColor: '#D8DEE9',
        width: '40%', 
        maxWidth: '40%', 
        minWidth: '40%', 
        height: 50, 
        maxHeight: 50, 
        minHeight: 50, 
        borderColor: '#5E81AC', 
        borderWidth: 5, 
        borderRadius: 50/2, 
        marginLeft: '5%', 
        marginRight: '5%'
    },
    settingsButtonText: {
        color: '#2E3440',
        fontSize: 14, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    like_comment_save_buttons: {
        minHeight: 40, 
        minWidth: 40, 
        width: 40, 
        height: 40, 
        maxWidth: 40, 
        maxHeight: 40, 
        position:'absolute', 
        left:15
    },
    ProfileTopBtn_Left: {
        position: 'absolute',
        zIndex: 100,
        width: '10%',
        backgroundColor: '#ECEFF4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 5,
        height: 40,
        right: '35%',
        flex: 500,
        width: 40,
        height: 40
    },
    ProfileTopBtn_Right: {
        position: 'absolute',
        zIndex: 10000,
        width: '10%',
        backgroundColor: '#ECEFF4',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 5,
        height: 40,
        left: '35%',
        flex: 500,
        height: 40,
        width: 40
    }
})

var lightModeStyling_navFocusedColor = '#5E81AC';
var darkModeStyling_navFocusedColor = '#88C0D0';
var darkModeStyling_navNonFocusedColor = '#ECEFF4';
var lightModeStyling_navNonFocusedColor = '#2E3440';



export {
    darkModeStyling, 
    darkModeOn, 
    lightModeStyling, 
    lightModeStyling_navFocusedColor, 
    darkModeStyling_navFocusedColor, 
    darkModeStyling_navNonFocusedColor, 
    lightModeStyling_navNonFocusedColor
};

/* Kovid's code*/

const StatusBarHeight = Constants.statusBarHeight;

//Colours

export const Colors = {
    primary: '#3b4252',
    secondary: '#88c0d0',
    tertiary: '#eceff4',
    darkLight: '#4c566a',
    brand: '#88c0d0',
    green: '#A3BE8C',
    red: '#BF616A',
    darkest: '#2e3440',
    greyish: '#D8DEE9',
    bronzeRarity: '#b08d57',
    darkestBlue: '#5E81AC'
};

const {primary, secondary,tertiary, darkLight, brand, green, red, darkest, greyish, bronzeRarity, darkestBlue} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    padding-vertical: 25px;
    padding-top: ${StatusBarHeight + 10}px;
`;

export const WelcomeContainer = styled(InnerContainer)`
    background-color: ${primary};
    flex: 5;
    width: 100%;
    display: flex;
    padding-vertical: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    ${props => props.postScreen == true &&`
        justify-content: center;
    `}
    ${props => props.audioPostScreen == true &&`
        padding-top: ${StatusBarHeight + 50}px;
    `}
    ${props => props.reportBugScreenScreen == true &&`
        padding-top: ${StatusBarHeight + 40}px;
        justify-content: center;
    `}
`;

export const PageLogo = styled.Image`
    width: 95px;
    height: 95px;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;


export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
    ${(props) => props.welcome && `
        font-size: 35px;
    `}
    ${(props) => props.badges && `
        margin-top: 10px;
        font-size: 35px;
    `}
    ${(props) => props.fontSize && `
        font-size: ${props.fontSize};
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome && `
        margin-bottom: 5px;
        font-weight: normal;
    `}

    ${(props) => props.profText && `
        margin-top: 8px;
    `}

    ${(props) => props.bioText && `
        margin-top: 8px;
    `}

    ${(props) => props.profNoPosts && `
        text-align: center;
        align-self: center;
        margin-top: 40px;
        margin-bottom: 40px;
    `}

    ${(props) => props.centered && `
        text-align: center;
    `}

    ${(props) => props.marginLeft && `
        margin-left: ${props.marginLeft};
    `}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${darkest};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    border-color: ${secondary};
    border-width: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
    ${(props) => props.bugReport == true && `
        height: 200px;
    `}
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.signUpButton == true && `
        background-color: ${primary};
        border-radius: 5px;
        border-color: ${secondary};
        border-width: 5px;
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.signUpButton == true && `
        color: ${secondary};
        padding: 25px; 
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${(props) => (props.type == 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color = ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 3px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;
`;

export const ProfInfoAreaImage = styled.View`
    align-items: center;
    text-align: center;
    width: 100%;
`;

export const ProfileBadgesView = styled.TouchableOpacity`
    align-items: center;
    flexDirection: row;
    border-top-width: 3px;
    border-bottom-width: 3px;
    border-color: ${darkest}
`;

export const ProfileBadgeIcons = styled.Image`
    width: 25px;
    height: 25px;
    margin-horizontal: 3px;
    margin-vertical: 6px;
`;

export const ProfileHorizontalView = styled.View`
    flex: 2;
    flexDirection: row;
`;

export const ProfileTopBtns = styled.TouchableOpacity`
    position: absolute;
    zIndex: 100;
    width: 10%;
    background-color: ${secondary};
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-vertical: 5px;
    height: 40px;
    ${(props) => props.rightSide == true && `
        left: 35% ;
    `}
    ${(props) => props.leftSide == true && `
        right: 35%;
    `}
`;

export const TopButtonIcons = styled.Image`
    width: 100%;
    height: 100%;
`;


export const ProfileHorizontalViewItem = styled.View`
    border-color: ${darkest};
    flex: 1;
    align-items: center;
    text-align: center;
    border-top-width: 3px;
    border-bottom-width: 3px;
    ${(props) => props.profCenterIcon == true && `
        border-right-width: 3px;
        border-left-width: 3px;
    `}
`;

export const ProfIcons = styled.Image`
    width: 45px;
    height: 45px;
    margin-bottom: 8px;
`;

export const ProfilePostsSelectionView = styled.View`
    width: 100%;
    border-color: ${darkest};
    align-items: center;
    border-bottom-width: 3px;
    flex: 1;
    flexDirection: row;
`;

export const ProfilePostsSelectionBtns = styled.TouchableOpacity`
    flex: 1;
    background-color: 'rgba(52, 52, 52, 0.8)';
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    margin-vertical: 5px;
    margin-horizontal: 5px;
    height: 80px;
`;

export const ProfileGridPosts = styled.View`
    border-color: ${darkest};
    border-bottom-width: 3px;
`;

export const ProfileFeaturedPosts = styled.View`
    border-color: ${darkest};
    border-bottom-width: 3px;
`;

export const SettingsPageItemTouchableOpacity = styled.TouchableOpacity`
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    border-color: ${darkest};
    border-width: 3px;
    margin-bottom: 10px;
`;

export const SettingsItemImage = styled.Image`
    width: 45px;
    height: 45px;
    margin-top: 5px;
`;

export const SettingsItemText = styled.Text`
    color: ${tertiary};
    align-self: center;
    font-size: 20px;
    margin-bottom: 5px;
`;

export const ConfirmLogoutView = styled.View`
    position: absolute;
    zIndex: 100;
    align-self: center;
    align-items: center;
    margin-vertical: 30%;
    left: -30000px;
    width: 90%;
    height: 400px;
    background-color: ${darkest};
    border-color: ${secondary};
    border-radius: 20px;
    border-width: 3px;
    ${(props) => props.viewHidden == false && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: 0px
    `}
    ${(props) => props.viewHidden == true && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: -30000px;
    `}
`;

export const ConfirmLogoutText = styled.Text`
    color: ${tertiary};
    align-self: center;
    text-align: center;
    font-size: 40px;
    margin-vertical: 10px;
`;

export const ConfirmLogoutButtons = styled.TouchableOpacity`
    height: 25%;
    margin-top: 5%;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 20px;
    border-width: 3px;
    border-color: ${primary};
    ${(props) => props.cancelButton == true && `
        background-color: ${greyish};
    `}
    ${(props) => props.confirmButton == true && `
        background-color: ${red};
    `}
`;

export const ConfirmLogoutButtonText = styled.Text`
    color: ${darkest};
    align-self: center;
    text-align: center;
    font-size: 25px;
    margin-vertical: 10px;
    ${(props) => props.cancelButton == true && `
        color: ${darkest};
    `}
    ${(props) => props.confirmButton == true && `
        color: ${tertiary};
    `}
`;

export const BadgeGridLayout = styled.View`
    flexDirection: row;
    flexWrap: wrap;
`;

export const BackgroundDarkColor = styled.View`
    background-color: ${primary};
    height: 100%;
    minHeight: 100%;
    zIndex: -100;
`;

export const ProfileOptionsView = styled.View`
    position: absolute;
    zIndex: 9999999;
    align-self: center;
    align-items: center;
    margin-vertical: 30%;
    left: -30000px;
    width: 90%;
    height: 400px;
    background-color: ${darkest};
    border-color: ${secondary};
    border-radius: 20px;
    border-width: 3px;
    ${(props) => props.viewHidden == false && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: 0px
    `}
    ${(props) => props.viewHidden == true && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: -30000px;
    `}
`;

export const ProfileOptionsViewButtons = styled.TouchableOpacity`
    height: 20%;
    margin-top: 5%;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 20px;
    border-width: 3px;
    border-color: ${primary};
    ${(props) => props.greyButton == true && `
        background-color: ${greyish};
    `}
    ${(props) => props.redButton == true && `
        background-color: ${red};
    `}
`;

export const ProfileOptionsViewButtonsText = styled.Text`
    color: ${darkest};
    align-self: center;
    text-align: center;
    font-size: 25px;
    margin-vertical: 10px;
    ${(props) => props.greyButton == true && `
        color: ${darkest};
    `}
    ${(props) => props.redButton == true && `
        color: ${tertiary};
    `}
`;

export const ProfileOptionsViewText = styled.Text`
    color: ${tertiary};
    align-self: center;
    text-align: center;
    font-size: 30px;
    margin-vertical: 10px;
`;

export const ProfileOptionsViewSubtitleText = styled.Text`
    color: ${tertiary};
    align-self: center;
    text-align: center;
    font-size: 24px;
    margin-vertical: 3px;
`;

export const TermsOfServiceGoBackButton = styled.TouchableOpacity`
    height: 80px;
    margin-top: 10%;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 20px;
    border-width: 3px;
    border-color: ${primary};
    background-color: ${greyish};
    align-self: center;
`;

export const TermsOfServiceGoBackButtonText = styled.Text`
    color: ${darkest};
    align-self: center;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    margin-vertical: 10px;
    color: ${darkest};
`;

export const TermsOfServiceBackground = styled.SafeAreaView`
    backgroundColor: ${primary};
    flex: 1;
`;

export const ReportProfileOptionsView = styled.View`
    position: absolute;
    zIndex: 9999999;
    align-self: center;
    align-items: center;
    margin-vertical: 30%;
    left: -30000px;
    width: 90%;
    height: 550px;
    background-color: ${darkest};
    border-color: ${secondary};
    border-radius: 20px;
    border-width: 3px;
    ${(props) => props.viewHidden == false && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: 0px
    `}
    ${(props) => props.viewHidden == true && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: -30000px;
    `}
`;

export const ReportProfileOptionsViewButtons = styled.TouchableOpacity`
    margin-top: 5%;
    align-items: center;
    justify-content: center;
    width: 80%;
    border-radius: 20px;
    border-width: 3px;
    border-color: ${primary};
    flex-wrap: wrap;
    text-align: center;
    align-self: center;
    align-content: center;
    ${(props) => props.greyButton == true && `
        background-color: ${greyish};
    `}
    ${(props) => props.redButton == true && `
        background-color: ${red};
    `}
`;

export const ReportProfileOptionsViewButtonsText = styled.Text`
    color: ${darkest};
    align-self: center;
    text-align: center;
    font-size: 25px;
    margin-vertical: 10px;
    ${(props) => props.greyButton == true && `
        color: ${darkest};
    `}
    ${(props) => props.redButton == true && `
        color: ${tertiary};
    `}
`;

export const ReportProfileOptionsViewText = styled.Text`
    color: ${tertiary};
    align-self: center;
    text-align: center;
    font-size: 30px;
    margin-vertical: 10px;
`;

export const ReportProfileOptionsViewSubtitleText = styled.Text`
    color: ${tertiary};
    align-self: center;
    text-align: center;
    font-size: 10px;
    margin-vertical: 3px;
`;

/* Code from merge of Kovid's code 17/08/21 */
export const BadgeGridViewBlockStyle = styled.TouchableOpacity`
    justifyContent: center;
    flex: 1;
    alignItems: center;
    margin: 2.5%;
    padding-horizontal: 20%;
    border-color: ${secondary};
    border-width: 3px;
`;

export const GridViewInsideTextItemStyle = styled.Text`
    color: ${tertiary};
    justifyContent: center;
    ${(props) => props.badgeTitle == true &&`
        fontSize: 20px;
    `}
    ${(props) => props.bottomText == true && `
        margin-bottom: 10px;
        fontSize: 18px;
    `}
    ${(props) => props.rarityForTextColor == "Bronze" && `
        fontSize: 25px;
        margin-top: 10px;
        color: ${bronzeRarity};
    `}
`;

export const BadgeGridViewImage = styled.Image`
    margin-vertical: 10px;
    width: 80px;
    height: 80px;
`;

export const PostCollectionView = styled.View`
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`;

export const PostHorizontalView = styled.View`
    flexDirection: row;
`;

export const PostTypeSelector = styled.TouchableOpacity`
    padding-horizontal: 10px;
    padding-vertical: 10px;
    border-width: 3px;
    border-color: ${brand};
    border-radius: 100px;
    ${(props) => props.sideIcons == true && `
        margin-horizontal: 40px;
    `} 
    ${(props) => props.styleForSelected == true && `
        border-color: ${darkestBlue};
    `} 
`;

export const PostIcons = styled.Image`
    width: 60px;
    height: 60px;
`;

export const PostMsgBox = styled.Text`
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    color: ${red};
    ${(props) => props.viewHidden == true && `
        margin-left: 5%;
        margin-right: 5%;
        text-align: center;
        align-self: center;
        align-items: center;
        left: 0px;
    `}
    ${(props) => props.viewHidden == false && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: -30000px;
    `}
`;
/* End of code from code merge of 17/08/21 */

export const FlexRow = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
`;

export const LeftButton_AudioUploadScreen = styled.View`
    margin-right: 7%
`;

export const RightButton_AudioUploadScreen = styled.View`
    margin-left: 7%
`;

export const AudioUploadScreenUploadButtons = styled.View`
    justify-content: center;
    align-self: center;
    align-content: center;
    align-items: center;
    margin-top: 20%;
`;

export const HorizontalLineAcrossScreen = styled.View`
    z-index: 100;
    ${(props) => `
        width: ${props.elementWidth}
    `}
    ${(props) => `
        height: ${props.elementHeight}
    `}
    ${(props) => `
        background-color: ${props.elementColor}
    `}
`;

export const RecordAudio_AudioUploadPage = styled.View`
    position: absolute;
    zIndex: 9999999;
    align-self: center;
    align-items: center;
    margin-vertical: 30%;
    left: -30000px;
    width: 90%;
    height: 400px;
    background-color: ${darkest};
    border-color: ${secondary};
    border-radius: 20px;
    border-width: 3px;
    ${(props) => props.viewHidden == false && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: 0px
    `}
    ${(props) => props.viewHidden == true && `
        margin-left: 5%;
        margin-right: 5%;
        position: absolute;
        align-self: center;
        align-items: center;
        left: -30000px;
    `}
`;

export const RecordButton_RecordScreen_AudioUploadPage = styled.TouchableOpacity`
    position: absolute;
    right: 20%;
    padding-right: 10px;
    border-right-width: 3px;
    border-color: ${tertiary};
    width: 80px;
`;

export const RecordButtonChanger_RecordScreen_AudioUploadPage = styled.View`
    ${(props) => props.viewHidden == true && `
        position: absolute;
        left: 30000px;
    `}
`;

export const AudioWaveBox_RecordScreen_AudioUploadPage = styled.View`
    border-width: 0px;
    border-radius: 50px;
    border-color: ${tertiary};
    width: 60%;
    ${(props) => props.viewHidden == true && `
        position: absolute;
        left: 30000px;
    `}
`;

export const ViewHider = styled.View`
    ${(props) => props.viewHidden == true && `
        position: absolute;
        left: 30000px;
    `}
    ${(props) => props.bugScreenVarNum !== 2 && props.bugScreen == 2 && `
        position: absolute;
        left: 30000px;
    `}
    ${(props) => props.bugScreenVarNum !== 1 && props.bugScreen == 1 && `
        position: absolute;
        left: 30000px;
    `}
    ${(props) => props.zIndex && `
        z-index: ${props.zIndex};
    `}
`;

export const TestText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${tertiary};
    text-align: center;
`;

export const ChatScreenNavigator_Row_Styling = styled.TouchableOpacity`
    background-color: ${darkLight}
    border-color: ${darkest};
    border-width: 2px;
    height: 65px;
    margin-horizontal: 2px;
    flex-direction: row;
`;

export const BackgroundDarkColor_SafeAreaView = styled.SafeAreaView`
    background-color: ${primary};
    height: 100%;
`;

export const ChatScreenNavigator_Title = styled.View`
    border-width: 1px;
    border-color: ${primary};
    height: 45px;
`;

export const FlexRow_NOJustifyContent = styled.View`
    flex: 1;
    flex-direction: row;
`;

export const ChatScreen_Title = styled.View`
    border-width: 1px;
    border-color: ${darkest};
    height: 90px;
    background-color: ${darkest};
    padding-top: ${StatusBarHeight + 10}px;
`;

export const Chat_Info_Icon_Styling = styled.TouchableOpacity`
    position: absolute;
    right: 10px;
    padding-top: ${StatusBarHeight + 2}px;
`;

export const ChatScreenInformation_Title = styled.View`
    border-width: 1px;
    border-color: ${darkest};
    height: 90px;
    background-color: ${darkest};
    padding-top: ${StatusBarHeight + 9}px;
`;

export const Navigator_BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    padding-top: ${StatusBarHeight + 2}px;
    z-index: 10000;
`;