import { calculateAmount, calculateOriginalAmount } from './calculateAmount';

const makeOrder = (authentication, storeMenu, cart, customerDetails, paymentMethod) => ({
    userId: authentication.user.data.id,
    storeId: storeMenu.storeId,
    userName: customerDetails.name,
    phoneNumber: customerDetails.phone,
    note: customerDetails.note,
    paymentMethod,
    token: '',
    totalAmount: calculateAmount(cart),
    totalPriceAmount: calculateOriginalAmount(cart),
    orderDetails: mapCartToOrderDetails(cart)
});

const mapCartToOrderDetails = ({ items }) => items.map(
    ({ product, quantity }) => ({
        'product_id': product.id,
        'product_name': product.name,
        'product_type': product.productType,
        'quantity': quantity
    })
);

export default makeOrder;
