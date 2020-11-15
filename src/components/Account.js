import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { showCartButton, hideCartButton, logoutCurrentUser } from '../actions';
import { loginStatus } from '../enums';

import PageHeader from './PageHeader';
import { Button } from 'semantic-ui-react';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.onClickLogout = this.onClickLogout.bind(this);
    }

    deleteAuthentication(nextAuthentication) {
        const nextLoginStatus = nextAuthentication.login.status;
        const shouldDelete = nextLoginStatus === loginStatus.NOT_LOGGED_IN;

        if (shouldDelete) {
            window.localStorage.removeItem('storedAuthentication');
        }
    }

    onClickLogout() {
        const confirmation = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
        if (confirmation) {
            this.props.logoutCurrentUser();
        }
    }

    componentDidMount() {
        this.props.hideCartButton();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.deleteAuthentication(nextProps.authentication);
    }

    componentWillUnmount() {
        this.props.showCartButton();
    }

    render() {
        const currentLoginStatus = this.props.authentication.login.status;
        const isNotLoggedIn = currentLoginStatus !== loginStatus.LOGGED_IN;

        if (isNotLoggedIn) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="account inner-page">
                <PageHeader>Tài khoản</PageHeader>
                <Button
                    basic
                    color="red"
                    icon="sign out alternate"
                    content="Đăng xuất"
                    onClick={this.onClickLogout}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

const actions = {
    showCartButton,
    hideCartButton,
    logoutCurrentUser
};

const ConnectedAccount = connect(mapStateToProps, actions)(Account);

export default ConnectedAccount;
