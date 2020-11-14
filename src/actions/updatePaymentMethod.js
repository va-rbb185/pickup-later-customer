import { UPDATE_PAYMENT_METHOD } from './types';

const updatePaymentMethod = (paymentMethod) => ({
    type: UPDATE_PAYMENT_METHOD,
    paymentMethod
});

export default updatePaymentMethod;
