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

const fetchMenu = (storeToken, onCompletion) => dispatch => {
    dispatch(fetchMenuStart());
    fetchStoreMenu(storeToken)
        .then(response => dispatch(fetchMenuSuccess(response)))
        .catch(error => dispatch(fetchMenuFailure(error)))
        .finally(() => {
            if (typeof onCompletion === 'function') onCompletion();
        });
};

export default fetchMenu;
