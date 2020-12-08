import { fetchOrdersByUser } from '../api';
import {
    FETCH_ORDER_HISTORY_START,
    FETCH_ORDER_HISTORY_SUCCESS,
    FETCH_ORDER_HISTORY_FAILURE
} from './types';

const fetchOrderHistoryStart = () => ({ type: FETCH_ORDER_HISTORY_START });

const fetchOrderHistorySuccess = orderHistory => ({
    type: FETCH_ORDER_HISTORY_SUCCESS,
    orderHistory
});

const fetchOrderHistoryFailure = (error) => ({
    type: FETCH_ORDER_HISTORY_FAILURE,
    error
});

const fetchOrderHistory = (userId, params, callback = null) => dispatch => {
    dispatch(fetchOrderHistoryStart());
    fetchOrdersByUser(userId, params)
        .then(response => dispatch(fetchOrderHistorySuccess(response)))
        .catch(error => dispatch(fetchOrderHistoryFailure(error)))
        .finally(() => {
            if (typeof callback === 'function') {
                callback();
            }
        });
};

export default fetchOrderHistory;
