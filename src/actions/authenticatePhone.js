import { authenticatePhone as authenticatePhoneApi } from '../api';
import { loginStatus, userTypes } from '../enums';
import {
    AUTHENTICATE_PHONE_START,
    AUTHENTICATE_PHONE_SUCCESS,
    AUTHENTICATE_PHONE_FAILURE
} from './types';

const authenticatePhoneStart = () => ({ type: AUTHENTICATE_PHONE_START });

const authenticatePhoneSuccess = (phoneNumber) => ({
    type: AUTHENTICATE_PHONE_SUCCESS,
    authentication: {
        login: {
            status: loginStatus.PHONE_VERIFICATION,
            phoneNumber
        },
        user: {
            type: userTypes.GUEST,
            failedAttempts: 0
        }
    }
});

const authenticatePhoneFailure = error => ({
    type: AUTHENTICATE_PHONE_FAILURE,
    error
});

const authenticatePhone = phoneNumber => dispatch => {
    dispatch(authenticatePhoneStart());
    authenticatePhoneApi(phoneNumber)
        .then(response => {
            if (response.message && response.message === 'success') {
                dispatch(authenticatePhoneSuccess(phoneNumber));
            } else if (response.error) {
                dispatch(authenticatePhoneFailure(response.error));
            }
        })
        .catch(error => dispatch(authenticatePhoneFailure(error)));
};

export default authenticatePhone;
