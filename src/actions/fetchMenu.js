import { fetchStoreMenu } from '../api';
import {
    FETCH_MENU_START,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_FAILURE
} from './types';

const fetchMenuStart = () => ({ type: FETCH_MENU_START });

const fetchMenuSuccess = (response) => ({
    type: FETCH_MENU_SUCCESS,
    menu: response
});

const fetchMenuFailure = (error) => ({
    type: FETCH_MENU_FAILURE,
    error
});

export default () => dispatch => {
    console.info('Menu fetching started.');
    dispatch(fetchMenuStart());

    fetchStoreMenu()
        .then(response => {
            const action = fetchMenuSuccess(response);
            console.info('Menu fetching succeeded. Updated state:', action.menu);
            dispatch(action);
        })
        .catch(error => {
            const action = fetchMenuFailure(error);
            console.error('Menu fetching failed.', action.error);
            dispatch(action);
        });
};
