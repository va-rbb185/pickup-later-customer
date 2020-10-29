import { authenticatePhone as authenticatePhoneApi } from '../api';
import { loginStatus } from '../enums';
import {
    AUTHENTICATE_PHONE_START,
    AUTHENTICATE_PHONE_SUCCESS,
    AUTHENTICATE_PHONE_FAILURE
} from './types';

const authenticatePhoneStart = () => ({ type: AUTHENTICATE_PHONE_START });

const authenticatePhoneSuccess = (phoneNumber) => ({
    type: AUTHENTICATE_PHONE_SUCCESS,
    login: {
        status: loginStatus.PHONE_VERIFICATION,
        phoneNumber
    }
});

const authenticatePhoneFailure = () => ({ type: AUTHENTICATE_PHONE_FAILURE });

const authenticatePhone = phoneNumber => dispatch => {
    dispatch(authenticatePhoneStart());
    authenticatePhoneApi(phoneNumber)
        .then(response => {
            if (response.message && response.message === 'success') {
                dispatch(authenticatePhoneSuccess(phoneNumber));
            }
        })
        .catch(error => {
            console.error('Phone authentication failed.', error);
            dispatch(authenticatePhoneFailure());
        });
};

export default authenticatePhone;
