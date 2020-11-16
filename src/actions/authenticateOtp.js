import { authenticateOtp as authenticateOtpApi } from '../api';
import { loginStatus, userTypes } from '../enums';
import {
    AUTHENTICATE_OTP_START,
    AUTHENTICATE_OTP_SUCCESS,
    AUTHENTICATE_OTP_FAILURE
} from './types';

const authenticateOtpStart = () => ({ type: AUTHENTICATE_OTP_START });

const authenticateOtpSuccess = data => ({
    type: AUTHENTICATE_OTP_SUCCESS,
    authentication: {
        login: { status: loginStatus.LOGGED_IN },
        user: {
            type: userTypes.CUSTOMER,
            data
        }
    }
});

const authenticateOtpFailure = error => ({
    type: AUTHENTICATE_OTP_FAILURE,
    error
});

const authenticateOtp = (phoneNumber, otp) => dispatch => {
    dispatch(authenticateOtpStart());
    authenticateOtpApi(phoneNumber, otp)
        .then(response => {
            if (response.data) {
                dispatch(authenticateOtpSuccess(response.data));
            } else if (response.error) {
                dispatch(authenticateOtpFailure(response.error));
            }
        })
        .catch(error => dispatch(authenticateOtpFailure(error)));
};

export default authenticateOtp;
