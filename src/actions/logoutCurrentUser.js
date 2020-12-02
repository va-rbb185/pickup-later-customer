import { LoginStatus, UserType } from '../enums';
import { LOGOUT_CURRENT_USER } from './types';

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
    authentication: {
        login: { status: LoginStatus.NOT_LOGGED_IN },
        user: { type: UserType.GUEST }
    }
});

export default logoutCurrentUser;
