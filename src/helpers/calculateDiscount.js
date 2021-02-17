const calculateDiscount = (originalAmount, promo) => {
    if (!promo) return 0;

    if (promo.type === 'CASH') return promo.value;

    if (promo.type === 'DISCOUNT') {
        const discount = originalAmount * (promo.value / 100);
        const maxDiscount = promo.maxDiscount;

        if (discount < maxDiscount)
            return discount;

        return maxDiscount;
    }

    return 0;
};

export default calculateDiscount;
