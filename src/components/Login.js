import React from 'react';
import { connect } from 'react-redux';
import PageHeader from './PageHeader';
import { Button, Form, Message } from 'semantic-ui-react';
import { showCartButton, hideCartButton } from '../actions';
import { loginResources } from '../static/resources';

class Login extends React.Component {
    componentDidMount() {
        this.props.hideCartButton();
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        return (
            <div className="login inner-page">
                <PageHeader pageTitle={loginResources.PAGE_TITLE} />
                <div className="login-body">
                    <div className="login-form">
                        <Form success>
                            <Message
                                success
                                header={loginResources.DESCRIPTION_HEADER}
                                content={loginResources.DESCRIPTION_CONTENT}
                            />
                            <Form.Input placeholder={loginResources.INPUT_PLACEHOLDER_PHONE} />
                            <Form.Input placeholder={loginResources.INPUT_PLACEHOLDER_OTP} disabled />
                            <div className="submit-button-wrapper">
                                <Button className="phone-submit" color="green">{loginResources.SUBMIT_TEXT}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const actions = {
    showCartButton,
    hideCartButton
};
const ConnectedLogin = connect(null, actions)(Login);

export default ConnectedLogin;
