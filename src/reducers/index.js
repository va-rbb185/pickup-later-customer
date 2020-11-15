import { combineReducers } from 'redux';

import testDataReducer from './testDataReducer';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import showCartButtonReducer from './showCartButtonReducer';
import authenticationReducer from './authenticationReducer';
import customerDetailsReducer from './customerDetailsReducer';
import paymentMethodReducer from './paymentMethodReducer';
import orderConfirmationReducer from './orderConfirmationReducer';

export default combineReducers({
    testData: testDataReducer,
    storeMenu: menuReducer,
    cart: cartReducer,
    showCartButton: showCartButtonReducer,
    authentication: authenticationReducer,
    customerDetails : customerDetailsReducer,
    paymentMethod: paymentMethodReducer,
    orderConfirmation: orderConfirmationReducer
});
