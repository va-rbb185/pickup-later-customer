import { fetchStoreMenu } from '../api';
import {
    FETCH_MENU_START,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from './types';

const fetchMenuStart = () => ({ type: FETCH_MENU_START });

const fetchMenuSuccess = menu => ({
    type: FETCH_MENU_SUCCESS,
    menu
});

const fetchMenuFailure = error => ({
    type: FETCH_MENU_FAILURE,
    error
});

const fetchMenu = () => dispatch => {
    dispatch(fetchMenuStart());
    fetchStoreMenu()
        .then(response => dispatch(fetchMenuSuccess(response)))
        .catch(error => dispatch(fetchMenuFailure(error)));
};

export default fetchMenu;
