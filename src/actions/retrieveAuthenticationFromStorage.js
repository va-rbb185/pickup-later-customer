import { authentication as initialAuthentication } from '../store/initialState';
import { RETRIEVE_AUTHENTICATION_FROM_STORAGE } from './types';

const retrieveAuthenticationFromStorage = () => {
    const retrievedJson = window.localStorage.getItem('storedAuthentication');
    const retrievedAuthentication = retrievedJson ? JSON.parse(retrievedJson) : initialAuthentication;
    return {
        type: RETRIEVE_AUTHENTICATION_FROM_STORAGE,
        authentication: retrievedAuthentication
    };
};

export default retrieveAuthenticationFromStorage;
