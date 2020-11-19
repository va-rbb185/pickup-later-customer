import { UPDATE_ONGOING_ORDER } from './types';

const updateOngoingOrder = (cart = null, order = null, orderConfirmation = null) => ({
    type: UPDATE_ONGOING_ORDER,
    ongoingOrder: {
        cart,
        order,
        orderConfirmation
    }
});

export default updateOngoingOrder;
