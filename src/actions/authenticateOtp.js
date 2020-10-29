import { authenticateOtp as authenticateOtpApi } from '../api';
import { loginStatus, userTypes } from '../enums';
import {
    AUTHENTICATE_OTP_START,
    AUTHENTICATE_OTP_SUCCESS,
    AUTHENTICATE_OTP_FAILURE
} from './types';

const authenticateOtpStart = () => ({ type: AUTHENTICATE_OTP_START });

const authenticateOtpSuccess = (response) => ({
    type: AUTHENTICATE_OTP_SUCCESS,
    authentication: {
        login: { status: loginStatus.LOGGED_IN },
        user: {
            type: userTypes.CUSTOMER,
            data: response.data
        }
    }
});

const authenticateOtpFailure = () => ({ type: AUTHENTICATE_OTP_FAILURE });

const authenticateOtp = (phoneNumber, otp) => dispatch => {
    dispatch(authenticateOtpStart());
    authenticateOtpApi(phoneNumber, otp)
        .then(response => {
            console.info('OTP authentication succeeded:', response.data);
            dispatch(authenticateOtpSuccess(response));
        })
        .catch(error => {
            console.error('OTP authentication failed.', error);
            dispatch(authenticateOtpFailure());
        });
};

export default authenticateOtp;
