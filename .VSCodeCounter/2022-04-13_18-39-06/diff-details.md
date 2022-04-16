# Diff Details

Date : 2022-04-13 18:39:06

Directory /Users/sebastianwebster/GitHub/social-media-platform

Total : 68 files,  9392 codes, 581 comments, 573 blanks, all 10546 lines

[summary](results.md) / [details](details.md) / [diff summary](diff.md) / diff details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.github/ISSUE_TEMPLATE/bug-report.md](/.github/ISSUE_TEMPLATE/bug-report.md) | Markdown | 22 | 0 | 8 | 30 |
| [App.js](/App.js) | JavaScript | 413 | 55 | 32 | 500 |
| [app.json](/app.json) | JSON | 0 | 16 | 0 | 16 |
| [babel.config.js](/babel.config.js) | JavaScript | 1 | 0 | -1 | 0 |
| [components/BadgeEarntNotificationContext.js](/components/BadgeEarntNotificationContext.js) | JavaScript | 2 | 0 | 1 | 3 |
| [components/Posts.js](/components/Posts.js) | JavaScript | 787 | 31 | 82 | 900 |
| [components/ServerUrlContext.js](/components/ServerUrlContext.js) | JavaScript | 2 | 0 | 1 | 3 |
| [components/conversationOnlineHandler.js](/components/conversationOnlineHandler.js) | JavaScript | 2 | 1 | 1 | 4 |
| [components/reconnectPrompt.js](/components/reconnectPrompt.js) | JavaScript | 2 | 1 | 1 | 4 |
| [components/socketHandler.js](/components/socketHandler.js) | JavaScript | 2 | 1 | 1 | 4 |
| [navigation/ChatScreenStackNavigator.js](/navigation/ChatScreenStackNavigator.js) | JavaScript | 37 | 0 | 4 | 41 |
| [navigation/StackNavigator.js](/navigation/StackNavigator.js) | JavaScript | 15 | 0 | -2 | 13 |
| [navigation/Start_Stack.js](/navigation/Start_Stack.js) | JavaScript | 8 | 0 | 0 | 8 |
| [navigation/tabs.js](/navigation/tabs.js) | JavaScript | -3 | 0 | 0 | -3 |
| [package-lock.json](/package-lock.json) | JSON | 881 | 0 | 0 | 881 |
| [package.json](/package.json) | JSON | 20 | 0 | 0 | 20 |
| [screens/AccountBadges.js](/screens/AccountBadges.js) | JavaScript | 65 | 6 | 0 | 71 |
| [screens/AccountSettings.js](/screens/AccountSettings.js) | JavaScript | 29 | 0 | 1 | 30 |
| [screens/AdvancedSettingsScreen.js](/screens/AdvancedSettingsScreen.js) | JavaScript | 60 | 3 | 10 | 73 |
| [screens/AdvancedSettingsScreens/SwitchServerScreen.js](/screens/AdvancedSettingsScreens/SwitchServerScreen.js) | JavaScript | 152 | 3 | 18 | 173 |
| [screens/AppStyling.js](/screens/AppStyling.js) | JavaScript | -24 | 0 | 0 | -24 |
| [screens/BadgeInfo.js](/screens/BadgeInfo.js) | JavaScript | 98 | 0 | 4 | 102 |
| [screens/BadgesScreen.js](/screens/BadgesScreen.js) | JavaScript | -73 | -2 | -18 | -93 |
| [screens/CategoryCreationPage.js](/screens/CategoryCreationPage.js) | JavaScript | 16 | 5 | -1 | 20 |
| [screens/CategoryHome.js](/screens/CategoryHome.js) | JavaScript | 2 | 0 | 1 | 3 |
| [screens/CategoryViewPage.js](/screens/CategoryViewPage.js) | JavaScript | 49 | 10 | 6 | 65 |
| [screens/ChangeDisplayNamePage.js](/screens/ChangeDisplayNamePage.js) | JavaScript | 13 | 0 | 0 | 13 |
| [screens/ChangeEmailPage.js](/screens/ChangeEmailPage.js) | JavaScript | 13 | 0 | 0 | 13 |
| [screens/ChangeUsernamePage.js](/screens/ChangeUsernamePage.js) | JavaScript | 13 | 0 | 1 | 14 |
| [screens/Chat.js](/screens/Chat.js) | JavaScript | 3,705 | 195 | 194 | 4,094 |
| [screens/ChatScreenNavigator.js](/screens/ChatScreenNavigator.js) | JavaScript | -13 | 0 | -2 | -15 |
| [screens/CommentViewPage.js](/screens/CommentViewPage.js) | JavaScript | -34 | -4 | -4 | -42 |
| [screens/ConversationDMUserFind.js](/screens/ConversationDMUserFind.js) | JavaScript | 259 | 10 | 28 | 297 |
| [screens/ConversationUserFind.js](/screens/ConversationUserFind.js) | JavaScript | 402 | 10 | 31 | 443 |
| [screens/Conversations.js](/screens/Conversations.js) | JavaScript | 638 | 31 | 44 | 713 |
| [screens/CreateConversation.js](/screens/CreateConversation.js) | JavaScript | 287 | 9 | 36 | 332 |
| [screens/CreateConversationSelection.js](/screens/CreateConversationSelection.js) | JavaScript | 93 | 7 | 16 | 116 |
| [screens/CreateDMConversation.js](/screens/CreateDMConversation.js) | JavaScript | 170 | 8 | 30 | 208 |
| [screens/FindScreen.js](/screens/FindScreen.js) | JavaScript | 10 | 31 | -3 | 38 |
| [screens/HomeScreen.js](/screens/HomeScreen.js) | JavaScript | 262 | 111 | 23 | 396 |
| [screens/HomeScreenSettings.js](/screens/HomeScreenSettings.js) | JavaScript | 62 | 0 | 9 | 71 |
| [screens/HomeScreenSettings/Algorithm_HomeScreenSettings.js](/screens/HomeScreenSettings/Algorithm_HomeScreenSettings.js) | JavaScript | 143 | 5 | 8 | 156 |
| [screens/HomeScreenSettings/Audio_HomeScreenSettings.js](/screens/HomeScreenSettings/Audio_HomeScreenSettings.js) | JavaScript | 96 | 5 | 8 | 109 |
| [screens/HomeScreenSettings/Filter_HomeScreenSettings.js](/screens/HomeScreenSettings/Filter_HomeScreenSettings.js) | JavaScript | 140 | 5 | 8 | 153 |
| [screens/LoginScreen.js](/screens/LoginScreen.js) | JavaScript | 17 | 0 | 2 | 19 |
| [screens/NotificationsScreen.js](/screens/NotificationsScreen.js) | JavaScript | 46 | 0 | 2 | 48 |
| [screens/NotificationsSettingsScreen.js](/screens/NotificationsSettingsScreen.js) | JavaScript | 100 | 2 | 1 | 103 |
| [screens/PostScreen.js](/screens/PostScreen.js) | JavaScript | 13 | 0 | 1 | 14 |
| [screens/PostScreens/MultiMediaUploadPage.js](/screens/PostScreens/MultiMediaUploadPage.js) | JavaScript | -3 | 0 | -1 | -4 |
| [screens/PostScreens/PollUploadPage.js](/screens/PostScreens/PollUploadPage.js) | JavaScript | -3 | 0 | -1 | -4 |
| [screens/PostScreens/RecordAudioPage.js](/screens/PostScreens/RecordAudioPage.js) | JavaScript | 33 | 12 | 2 | 47 |
| [screens/PostScreens/ThreadUploadPage.js](/screens/PostScreens/ThreadUploadPage.js) | JavaScript | 5 | 0 | 0 | 5 |
| [screens/ProfilePages.js](/screens/ProfilePages.js) | JavaScript | 291 | 12 | 19 | 322 |
| [screens/ProfileScreen.js](/screens/ProfileScreen.js) | JavaScript | 72 | 24 | 1 | 97 |
| [screens/ReportBugScreen.js](/screens/ReportBugScreen.js) | JavaScript | -254 | -32 | -33 | -319 |
| [screens/SecuritySettingsScreen.js](/screens/SecuritySettingsScreen.js) | JavaScript | -63 | 0 | -5 | -68 |
| [screens/SecuritySettingsScreens/2FA.js](/screens/SecuritySettingsScreens/2FA.js) | JavaScript | 16 | 0 | 0 | 16 |
| [screens/SecuritySettingsScreens/GDPRCompliance.js](/screens/SecuritySettingsScreens/GDPRCompliance.js) | JavaScript | 20 | 0 | 0 | 20 |
| [screens/SecuritySettingsScreens/LoginActivity.js](/screens/SecuritySettingsScreens/LoginActivity.js) | JavaScript | 16 | 0 | 0 | 16 |
| [screens/SecuritySettingsScreens/LoginAttempts.js](/screens/SecuritySettingsScreens/LoginAttempts.js) | JavaScript | 16 | 0 | 0 | 16 |
| [screens/SelectCategorySearchScreen.js](/screens/SelectCategorySearchScreen.js) | JavaScript | 35 | 0 | 1 | 36 |
| [screens/SettingsScreen.js](/screens/SettingsScreen.js) | JavaScript | 32 | 0 | 0 | 32 |
| [screens/Signup.js](/screens/Signup.js) | JavaScript | 19 | 0 | 2 | 21 |
| [screens/ThreadViewPage.js](/screens/ThreadViewPage.js) | JavaScript | 51 | 2 | 2 | 55 |
| [screens/ViewImagePostPage.js](/screens/ViewImagePostPage.js) | JavaScript | 41 | 1 | 1 | 43 |
| [screens/ViewPollPostPage.js](/screens/ViewPollPostPage.js) | JavaScript | 40 | 1 | 0 | 41 |
| [screens/screenStylings/styling.js](/screens/screenStylings/styling.js) | JavaScript | 19 | 0 | 2 | 21 |
| [tweetNacl.js](/tweetNacl.js) | JavaScript | 9 | 6 | 1 | 16 |

[summary](results.md) / [details](details.md) / [diff summary](diff.md) / diff details