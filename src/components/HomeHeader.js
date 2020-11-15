import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { loginStatus } from '../enums';

import SearchBox from './SearchBox';

const HomeHeader = ({ isLoggedIn }) => {
    let history = useHistory();
    return (
        <div className="home-header">
            <div className="container-fluid">
                <div className="home-header-wrapper">
                    <SearchBox />
                    <Button icon="user" onClick={() => history.push(isLoggedIn ? '/account' : '/login')} />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ authentication }) => ({ isLoggedIn: authentication.login.status === loginStatus.LOGGED_IN });

const ConnectedHomeHeader = connect(mapStateToProps)(HomeHeader);

export default ConnectedHomeHeader;
