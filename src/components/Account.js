import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react';
import { showCartButton, hideCartButton, authenticatePhone, authenticateOtp } from '../actions';
import { loginStatus } from '../enums';
import { loginResources } from '../static/resources';

import PageHeader from './PageHeader';

class Account extends React.Component {
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

    onPhoneInputChange(event) {
        this.setState({ phoneNumber: event.target.value });
    }

    onOtpInputChange(event) {
        this.setState({ otp: event.target.value });
    }

    onSubmitPhone() {
        const { phoneNumber } = this.state;
        if (phoneNumber) {
            this.props.authenticatePhone(phoneNumber);
        }
    }

    onSubmitOtp() {
        const { otp } = this.state;
        const { phoneNumber } = this.props.authentication.login;
        if (phoneNumber && otp) {
            const decimalOtp = parseInt(otp, 10);
            this.props.authenticateOtp(phoneNumber, decimalOtp);
        }
    }

    saveAuthenticationToStorage(authentication) {
        if (authentication.login.status !== loginStatus.PHONE_VERIFICATION) {
            window.localStorage.setItem('storedAuthentication', JSON.stringify(authentication));
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.props.hideCartButton();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        /*
         * Detects changes in `authentication` state
         * Saves authentication information to `localStorage` whenever it is updated in store
         */
        this.saveAuthenticationToStorage(nextProps.authentication);
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        const currentLoginStatus = this.props.authentication.login.status;
        const isNotLoggedIn = currentLoginStatus === loginStatus.NOT_LOGGED_IN;
        const isPhoneVerification = currentLoginStatus === loginStatus.PHONE_VERIFICATION;
        const isLoggedIn = currentLoginStatus === loginStatus.LOGGED_IN;

        if (isLoggedIn) {
            return (
                <div className="account inner-page">
                    <PageHeader>Account Page</PageHeader>
                    <a href="/logout">Đăng xuất</a>
                </div>
            );
        }

        if (isNotLoggedIn || isPhoneVerification) {
            return (
                <div className="login inner-page">
                    <PageHeader>{loginResources.PAGE_TITLE}</PageHeader>
                    <div className="login-body">
                        <div className="login-form">
                            <Form success>
                                <Message
                                    success
                                    header={loginResources.DESCRIPTION_HEADER}
                                    content={loginResources.DESCRIPTION_CONTENT}
                                />
                                <Form.Input
                                    disabled={!isNotLoggedIn}
                                    placeholder={loginResources.INPUT_PLACEHOLDER_PHONE}
                                    value={this.state.phoneNumber}
                                    required={true}
                                    maxLength={10}
                                    pattern="^(?=0)[0-9]{10}$"
                                    onChange={this.onPhoneInputChange}
                                />
                                <Form.Input
                                    disabled={!isPhoneVerification}
                                    placeholder={loginResources.INPUT_PLACEHOLDER_OTP}
                                    value={this.state.otp}
                                    required={isPhoneVerification}
                                    maxLength={6}
                                    pattern="^[0-9]{6}$"
                                    onChange={this.onOtpInputChange}
                                />
                                <div className="submit-button-wrapper">
                                    <Button
                                        className={`phone-submit${isNotLoggedIn ? '' : ' d-none'}`}
                                        color="green"
                                        onClick={this.onSubmitPhone}
                                    >
                                        {loginResources.SUBMIT_PHONE}
                                    </Button>
                                    <Button
                                        className={`otp-submit${isPhoneVerification ? '' : ' d-none'}`}
                                        color="green"
                                        onClick={this.onSubmitOtp}
                                    >
                                        {loginResources.SUBMIT_OTP}
                                    </Button>
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

const actions = {
    showCartButton,
    hideCartButton,
    authenticatePhone,
    authenticateOtp
};

const ConnectedAccount = connect(mapStateToProps, actions)(Account);

export default ConnectedAccount;
