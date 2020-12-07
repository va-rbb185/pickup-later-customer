const getOrderQuantity = (orderItems, countComboProducts = false) => {
    let result = 0;
    orderItems.forEach(item => {
        if (item.productType === 'Combo') {
            if (countComboProducts) {
                item.products.forEach(product => {
                    result += product.quantity;
                });
            } else {
                result += item.quantity;
            }
        } else if (item.productType === 'Product') {
            result += item.quantity;
        }
    });
    return result;
};

export default getOrderQuantity;
