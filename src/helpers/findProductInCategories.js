const findProductInCategories = (productIdToFind, categories) => {
    let result = [null, null];

    categories.some(category => {
        const categoryProducts = category.products;
        const foundProduct = categoryProducts.find(product => product.id === productIdToFind);
        if (typeof foundProduct === 'object') {
            result = [category, foundProduct];
            return true;
        }
        return false;
    });

    return result;
};

export default findProductInCategories;
