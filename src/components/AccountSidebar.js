import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { logoutCurrentUser } from '../actions';

const AccountSidebar = ({ authentication, hideSideBar }) => {
    const dispatch = useDispatch();
    return (
        <div className="sidebar-content">
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
