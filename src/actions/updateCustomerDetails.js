import { UPDATE_CUSTOMER_DETAILS } from './types';

const updateCustomerDetails = (customerDetails) => ({
    type: UPDATE_CUSTOMER_DETAILS,
    customerDetails
});

export default updateCustomerDetails;
