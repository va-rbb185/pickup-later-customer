import { combineReducers } from 'redux';

import testDataReducer from './testDataReducer';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';

export default combineReducers({
    testData: testDataReducer,
    storeMenu: menuReducer,
    cart: cartReducer
});
