import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

export const setAuthAsHeaders = () => {
    SecureStore.getItemAsync('json-react-web-token')
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

export const storeJWT = () => {
    
}