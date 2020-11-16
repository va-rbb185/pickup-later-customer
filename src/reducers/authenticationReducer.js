import { authentication } from '../store/initialState';
import {
    AUTHENTICATE_PHONE_START,
    AUTHENTICATE_PHONE_SUCCESS,
    AUTHENTICATE_PHONE_FAILURE,
    AUTHENTICATE_OTP_START,
    AUTHENTICATE_OTP_SUCCESS,
    AUTHENTICATE_OTP_FAILURE,
    RETRIEVE_AUTHENTICATION_FROM_STORAGE,
    LOGOUT_CURRENT_USER
} from '../actions/types';

const authenticationReducer = (prevState = authentication, action) => {
    switch (action.type) {
        case AUTHENTICATE_PHONE_START:
            return prevState;

        case AUTHENTICATE_PHONE_SUCCESS: {
            let nextState = { ...prevState };
            nextState.login = action.login;
            return nextState;
        }

        case AUTHENTICATE_PHONE_FAILURE: {
            let nextState = { ...prevState };
            nextState.login.error = action.error;
            return nextState;
        }

        case AUTHENTICATE_OTP_START:
            return prevState;

        case AUTHENTICATE_OTP_SUCCESS:
            return action.authentication;

        case AUTHENTICATE_OTP_FAILURE: {
            let nextState = { ...prevState };
            nextState.user.error = action.error;
            return nextState;
        }

        case RETRIEVE_AUTHENTICATION_FROM_STORAGE:
            return action.authentication;

        case LOGOUT_CURRENT_USER:
            return action.authentication;

        default:
            return prevState;
    }
};

export default authenticationReducer;
