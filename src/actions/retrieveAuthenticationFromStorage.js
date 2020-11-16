import { loginStatus, userTypes } from '../enums';
import { RETRIEVE_AUTHENTICATION_FROM_STORAGE } from './types';

const retrieveAuthenticationFromStorage = () => {
    let authentication = {
        login: { status: loginStatus.NOT_LOGGED_IN },
        user: { type: userTypes.GUEST }
    };
    const retrievedJson = window.localStorage.getItem('storedAuthentication');
    if (retrievedJson) {
        authentication = JSON.parse(retrievedJson);
    }
    return {
        type: RETRIEVE_AUTHENTICATION_FROM_STORAGE,
        authentication
    };
};

export default retrieveAuthenticationFromStorage;
