import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHistory } from '@fortawesome/free-solid-svg-icons';
import { logoutCurrentUser, clearCart } from '../actions';

const AccountSidebar = ({ userData, hideSideBar, logoutCurrentUser, clearCart }) => {
    if (userData) {
        return (
            <div className="sidebar-content">
                <div className="header">
                    <h4>Tài khoản</h4>
                </div>
                <div className="user">
                    <div className="user-icon">
                        <FontAwesomeIcon icon={faUser} size="3x" />
                    </div>
                    <div className="user-info">
                        <h5 className="user-name">{userData.userName || 'New User'}</h5>
                        <h6 className="phone-number">{userData.phoneNumber}</h6>
                    </div>
                </div>
                <div className="logout">
                    <Button
                        basic
                        color="red"
                        icon="sign out alternate"
                        content="Đăng xuất"
                        onClick={() => {
                            const confirmation = window.confirm('Bạn có chắc chắn muốn đăng xuất?');
                            if (confirmation) {
                                hideSideBar();
                                clearCart();
                                window.localStorage.removeItem('storedAuthentication');
                                logoutCurrentUser();
                            }
                        }}
                    />
                </div>
                <div className="sidebar-entry">
                    <div className="icon">
                        <FontAwesomeIcon icon={faHistory} size="2x" />
                    </div>
                    <div className="content">
                        <h5><Link to="/orders">Lịch sử mua hàng</Link></h5>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

const mapDispatchToProps = {
    logoutCurrentUser,
    clearCart
};

const ConnectedAccountSidebar = connect(null, mapDispatchToProps)(AccountSidebar);

export default ConnectedAccountSidebar;
