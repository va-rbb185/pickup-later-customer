export const calculateAmount = cart => {
    let amount = 0;
    cart.items.forEach(({ quantity, product }) => {
        amount += quantity * product.salePrice;
    });
    return amount;
};

export const calculateOriginalAmount = cart => {
    let amount = 0;
    cart.items.forEach(({ quantity, product }) => {
        amount += quantity * product.price;
    });
    return amount;
};
