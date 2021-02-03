export const addToCart = (product, currentCart) => {
    let nextCart = { ...currentCart };
    let existingItem = nextCart.items.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        nextCart.items.push({
            quantity: 1,
            product
        });
    }
    nextCart.amount += 1;

    return nextCart;
};

export const removeFromCart = (product, currentCart) => {
    let nextCart = { ...currentCart };
    let existingItem = nextCart.items.find(item => item.product.id === product.id);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            nextCart.items = nextCart.items.filter(item => item.product.id !== existingItem.product.id);
        }
        nextCart.amount -= 1;
        return nextCart;
    }

    return currentCart;
};

export const clearCart = () => ({
    amount: 0,
    items: []
});
