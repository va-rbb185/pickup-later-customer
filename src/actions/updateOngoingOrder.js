import { UPDATE_ONGOING_ORDER } from './types';

const updateOngoingOrder = (cart = null, order = null, orderConfirmation = null, orderId = null) => ({
    type: UPDATE_ONGOING_ORDER,
    ongoingOrder: {
        cart,
        order,
        orderConfirmation,
        orderId
    }
});

export default updateOngoingOrder;
