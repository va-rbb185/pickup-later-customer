import { combineReducers } from 'redux';

import testDataReducer from './testDataReducer';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import showCartButtonReducer from './showCartButtonReducer';
import authenticationReducer from './authenticationReducer';
import customerDetailsReducer from './customerDetailsReducer';
import paymentMethodReducer from './paymentMethodReducer';
import orderConfirmationReducer from './orderConfirmationReducer';
import showSpinnerReducer from './showSpinnerReducer';
import orderHistoryReducer from './orderHistoryReducer';
import cartNoReducer from './cartNoReducer';

const rootReducer = combineReducers({
    testData: testDataReducer,
    storeMenu: menuReducer,
    cart: cartReducer,
    showCartButton: showCartButtonReducer,
    authentication: authenticationReducer,
    customerDetails: customerDetailsReducer,
    paymentMethod: paymentMethodReducer,
    orderConfirmation: orderConfirmationReducer,
    showSpinner: showSpinnerReducer,
    orderHistory: orderHistoryReducer,
    cartNo: cartNoReducer
});

export default rootReducer;
