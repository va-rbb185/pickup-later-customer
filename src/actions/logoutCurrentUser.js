import { authentication } from '../store/initialState';
import { LOGOUT_CURRENT_USER } from './types';

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
    authentication
});

export default logoutCurrentUser;
