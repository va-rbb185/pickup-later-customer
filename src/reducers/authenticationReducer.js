import { authentication } from '../store/initialState';
import {
    AUTHENTICATE_PHONE_START,
    AUTHENTICATE_PHONE_SUCCESS,
    AUTHENTICATE_PHONE_FAILURE,
    AUTHENTICATE_OTP_START,
    AUTHENTICATE_OTP_SUCCESS,
    AUTHENTICATE_OTP_FAILURE,
    RETRIEVE_AUTHENTICATION_FROM_STORAGE,
    LOGOUT_CURRENT_USER,
    UPDATE_AUTH_CART_NUMBER
} from '../actions/types';

const authenticationReducer = (prevState = authentication, action) => {
    switch (action.type) {
        case AUTHENTICATE_PHONE_START:
            return prevState;

        case AUTHENTICATE_PHONE_SUCCESS:
            return action.authentication;

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
            nextState.user.failedAttempts += 1;
            return nextState;
        }

        case RETRIEVE_AUTHENTICATION_FROM_STORAGE:
            return action.authentication;

        case LOGOUT_CURRENT_USER:
            return action.authentication;

        case UPDATE_AUTH_CART_NUMBER: {
            let nextState = { ...prevState };
            nextState.user.data.cartNo = action.cartNo;
            return nextState;
        }

        default:
            return prevState;
    }
};

export default authenticationReducer;
