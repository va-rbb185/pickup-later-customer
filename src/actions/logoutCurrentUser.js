import { loginStatus, userTypes } from '../enums';
import { LOGOUT_CURRENT_USER } from './types';

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
    authentication: {
        login: { status: loginStatus.NOT_LOGGED_IN },
        user: { type: userTypes.GUEST }
    }
});

export default logoutCurrentUser;
