import { calculateAmount, calculateOriginalAmount } from '.';

const makeOrder = (authentication, storeMenu, cart, customerDetails, paymentMethod) => ({
    userId: authentication.user.data.id,
    storeId: storeMenu.storeId,
    userName: customerDetails.name,
    phoneNumber: customerDetails.phone,
    note: customerDetails.note,
    paymentMethod,
    totalAmount: calculateAmount(cart),
    totalPriceAmount: calculateOriginalAmount(cart),
    orderDetails: mapCartToOrderDetails(cart),
    redirectUrl: `${window.location.origin}/order-confirmation`
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
