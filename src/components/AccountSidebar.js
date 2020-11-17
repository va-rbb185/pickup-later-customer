import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logoutCurrentUser } from '../actions';

const AccountSidebar = ({ customerDetails, hideSideBar }) => {
    const dispatch = useDispatch();
    return (
        <div className="sidebar-content">
            <h3>{customerDetails.name || 'Logged-in User'}</h3>
            <div>{customerDetails.phone}</div>
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
    );
}

export default AccountSidebar;
