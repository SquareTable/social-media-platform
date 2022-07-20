import React, {useContext} from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'
import { ServerUrlContext } from './components/ServerUrlContext.js';
import {Logout} from './components/HandleLogout'
import { navigationRef } from './components/ReactNavigationRef.js';
import { CredentialsContext } from './components/CredentialsContext';
import { ProfilePictureURIContext } from './components/ProfilePictureURIContext.js';
import { AllCredentialsStoredContext } from './components/AllCredentialsStoredContext.js';

export const setAuthAsHeaders = async (userId) => {
    console.log("Setting auth as header")
    let AUTH_TOKEN = await SecureStore.getItemAsync(userId + '-auth-web-token')
    let REFRESH_TOKEN = await SecureStore.getItemAsync(userId + '-auth-refresh-token')
    if (AUTH_TOKEN) {
        console.log("auth token:")
        console.log(AUTH_TOKEN)
        axios.defaults.headers.common['auth-web-token'] = AUTH_TOKEN;
    } else {
        console.log("Error with getting auth token.")
    }
    if (REFRESH_TOKEN) {
        console.log("refresh token:")
        console.log(REFRESH_TOKEN)
        axios.defaults.headers.common['auth-refresh-token'] = REFRESH_TOKEN;
    } else {
        console.log("Error with getting refresh token.")
    }
}

export const storeJWT = async (tokens, userId) => {
    if (tokens.webToken !== "") {
        await SecureStore.setItemAsync(userId + '-auth-web-token', tokens.webToken)
        console.log("Set: " + userId + '-auth-web-token'+ JSON.stringify(tokens.webToken))
    }
    if (tokens.refreshToken !== "") {
        await SecureStore.setItemAsync(userId + "-auth-refresh-token", tokens.refreshToken)
        console.log("Set: " + userId + "-auth-refresh-token" + JSON.stringify(tokens.refreshToken))
    }
    await setAuthAsHeaders(userId)
    return
}

axios.interceptors.response.use((response) => {
    //console.log("Response:")
    //console.log(response)
    return response //let continue as normal
}, (error) => {
    const status = error.response?.status || 500;
    if (status == 401) {
        console.log("No JWT passed?")
        //setAuthAsHeaders() // why not // cant do anymore since userid is used in the keys for multiple accounts
    } else if (status == 403) {
        if (error.response.data.message == "Token generated.") {
            console.log("New token generated.")
            //refresh occured so repeat last request
            let token = error.response.data.token
            const forAsync = async () => {
                await storeJWT({webToken: token, refreshToken: ""}, error.response.data.userId)
                let configOfOriginal = error.config;
                delete configOfOriginal.headers["auth-web-token"]; // it will use from defaults so the new one bc the await above
                return axios.request(configOfOriginal);
            }
            forAsync()
        } else {
            console.log("Invalid token, should only be refresh token that sends this as a response so new login required.")
            return Promise.reject(error) // for now
            //for logout or smth
        }
    } else {
        Promise.reject(error) //let continue as normal
    }
   return Promise.reject(error)
});
