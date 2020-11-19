import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faHistory, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { logoutCurrentUser } from '../actions';

const AccountSidebar = ({ userData, hideSideBar }) => {
    let history = useHistory();
    const dispatch = useDispatch();

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
                    <h5 className="user-name">{userData['user_name'] || 'New User'}</h5>
                    <h6 className="phone-number">{userData['phone_number']}</h6>
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
                            window.localStorage.removeItem('storedAuthentication');
                            dispatch(logoutCurrentUser());
                            hideSideBar();
                        }
                    }}
                />
            </div>
            <div className="ongoing-order sidebar-entry" onClick={() => history.push('/ongoing-order')}>
                <div className="icon">
                    <FontAwesomeIcon icon={faReceipt} size="2x" />
                </div>
                <div className="content">
                    <h5>Đơn hàng đang thực hiện</h5>
                </div>
            </div>
            <div className="order-history sidebar-entry" onClick={null}>
                <div className="icon">
                    <FontAwesomeIcon icon={faHistory} size="2x" />
                </div>
                <div className="content">
                    <h5>Lịch sử mua hàng</h5>
                </div>
            </div>
        </div>
    );
}

export default AccountSidebar;
