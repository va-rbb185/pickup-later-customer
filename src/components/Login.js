import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import {
    showCartButton,
    hideCartButton,
    authenticatePhone,
    authenticateOtp,
    logoutCurrentUser
} from '../actions';
import { LoginStatus } from '../enums';
import { loginResources } from '../static/resources';

import PageHeader from './PageHeader';

class Login extends React.Component {
    MAX_ATTEMPTS_ALLOWED = 4;

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            otp: ''
        };
        this.onPhoneInputChange = this.onPhoneInputChange.bind(this);
        this.onOtpInputChange = this.onOtpInputChange.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        this.onSubmitOtp = this.onSubmitOtp.bind(this);
    }

    validatePhoneNumber(phoneNumber) {
        let valid = true;
        let validationMessage = [];

        if (!phoneNumber) {
            valid = false;
            validationMessage.push('Vui lòng nhập số điện thoại để tiếp tục.');
        }
        if (phoneNumber && !new RegExp('^(?=0)[0-9]{10}$').test(phoneNumber)) {
            valid = false;
            validationMessage.push('Vui lòng nhập số điện thoại hợp lệ.');
        }
        if (validationMessage.length > 0) {
            window.alert(validationMessage.join('\n'));
        }

        return valid;
    }

    validateOtp(otp) {
        let valid = true;
        let validationMessage = [];

        if (!otp) {
            valid = false;
            validationMessage.push('Vui lòng nhập mã OTP đã được gửi tới số điện thoại của bạn để tiếp tục.');
        }
        if (otp && !new RegExp('^[0-9]{6}$').test(otp)) {
            valid = false;
            validationMessage.push('Vui lòng nhập mã OTP hợp lệ.');
        }
        if (validationMessage.length > 0) {
            window.alert(validationMessage.join('\n'));
        }

        return valid;
    }

    saveAuthenticationToStorage(authentication) {
        if (authentication.login.status === LoginStatus.LOGGED_IN) {
            window.localStorage.setItem(
                'storedAuthentication',
                JSON.stringify(authentication)
            );
        }
    }

    onPhoneInputChange(event) {
        this.setState({ phoneNumber: event.target.value });
    }

    onOtpInputChange(event) {
        this.setState({ otp: event.target.value });
    }

    preventPressEnterSubmit(event) {
        event.key === 'Enter' && event.preventDefault();
    }

    onSubmitPhone() {
        const { phoneNumber } = this.state;
        const valid = this.validatePhoneNumber(phoneNumber);
        if (valid) {
            this.props.authenticatePhone(phoneNumber);
        }
    }

    onSubmitOtp() {
        const { otp } = this.state;
        const { phoneNumber } = this.props.authentication.login;
        const valid = phoneNumber && this.validateOtp(otp);
        if (valid) {
            const decimalOtp = parseInt(otp, 10);
            this.props.authenticateOtp(phoneNumber, decimalOtp);
            this.setState({ otp: '' });
        }
    }

    componentDidMount() {
        this.props.hideCartButton();
    }

    componentDidUpdate() {
        const currentLoginStatus = this.props.authentication.login.status;
        const isPhoneVerification = currentLoginStatus === LoginStatus.PHONE_VERIFICATION;
        const isLoggedIn = currentLoginStatus === LoginStatus.LOGGED_IN;
        const tooManyAttempts = this.props.authentication.user.failedAttempts === this.MAX_ATTEMPTS_ALLOWED;

        if (isPhoneVerification && tooManyAttempts) {
            this.props.logoutCurrentUser();
        } else if (isLoggedIn) {
            this.saveAuthenticationToStorage(this.props.authentication);
        }
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        const currentLoginStatus = this.props.authentication.login.status;
        const isNotLoggedIn = currentLoginStatus === LoginStatus.NOT_LOGGED_IN;
        const isPhoneVerification = currentLoginStatus === LoginStatus.PHONE_VERIFICATION;
        const isLoggedIn = currentLoginStatus === LoginStatus.LOGGED_IN;

        /* Render the page according to login status */
        if (isLoggedIn) {
            return <Redirect to="/" />;
        }

        if (isNotLoggedIn || isPhoneVerification) {
            /* Generate login message */
            let loginMessageComponent = null;

            if (isNotLoggedIn) {
                if (this.props.authentication.login.error) {
                    loginMessageComponent =
                        <Message
                            negative
                            header={loginResources.DESCRIPTION_HEADER_PHONE_FAILURE}
                            content={loginResources.DESCRIPTION_CONTENT_PHONE_FAILURE}
                        />;
                } else {
                    loginMessageComponent =
                        <Message
                            positive
                            header={loginResources.DESCRIPTION_HEADER_PHONE}
                            content={loginResources.DESCRIPTION_CONTENT_PHONE}
                        />;
                }
            } else if (isPhoneVerification) {
                if (this.props.authentication.user.error) {
                    loginMessageComponent =
                        <Message
                            negative
                            header={loginResources.DESCRIPTION_HEADER_OTP_FAILURE}
                            content={
                                `Vui lòng nhập chính xác mã OTP đã được gửi vào số điện thoại ${this.props.authentication.login.phoneNumber}. Bạn còn ${this.MAX_ATTEMPTS_ALLOWED - this.props.authentication.user.failedAttempts} lần thử.`
                            }
                        />;
                } else {
                    loginMessageComponent =
                        <Message
                            positive
                            header={loginResources.DESCRIPTION_HEADER_OTP}
                            content={
                                `Nhập mã OTP đã được gửi về số điện thoại ${this.props.authentication.login.phoneNumber} để hoàn tất đăng nhập.`
                            }
                        />;
                }
            }

            return (
                <div className="login inner-page">
                    <PageHeader>{loginResources.PAGE_TITLE}</PageHeader>
                    <div className="login-body">
                        <div className="login-form">
                            <Form success noValidate>
                                {loginMessageComponent}
                                <Form.Input
                                    className={!isNotLoggedIn ? 'd-none' : ''}
                                    type="tel"
                                    placeholder={loginResources.INPUT_PLACEHOLDER_PHONE}
                                    required={true}
                                    maxLength={10}
                                    pattern="^(?=0)[0-9]{10}$"
                                    value={this.state.phoneNumber}
                                    onChange={this.onPhoneInputChange}
                                    onKeyPress={this.preventPressEnterSubmit}
                                />
                                <Form.Input
                                    className={!isPhoneVerification ? 'd-none' : ''}
                                    type="text"
                                    placeholder={loginResources.INPUT_PLACEHOLDER_OTP}
                                    required={isPhoneVerification}
                                    maxLength={6}
                                    pattern="^[0-9]{6}$"
                                    value={this.state.otp}
                                    onChange={this.onOtpInputChange}
                                    onKeyPress={this.preventPressEnterSubmit}
                                />
                                <div className="submit-button-wrapper">
                                    <Button
                                        className={`phone-submit${isNotLoggedIn ? '' : ' d-none'}`}
                                        color="green"
                                        content={loginResources.SUBMIT_PHONE}
                                        onClick={this.onSubmitPhone}
                                    />
                                    <Button
                                        className={`otp-submit${isPhoneVerification ? '' : ' d-none'}`}
                                        color="green"
                                        content={loginResources.SUBMIT_OTP}
                                        onClick={this.onSubmitOtp}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

const mapDispatchToProps = {
    showCartButton,
    hideCartButton,
    authenticatePhone,
    authenticateOtp,
    logoutCurrentUser
};

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
