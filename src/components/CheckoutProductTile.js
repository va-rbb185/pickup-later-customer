import React from 'react';
import { Button } from 'semantic-ui-react';
import { formatPrice } from '../helpers';

const CheckoutProductTile = ({ cartItem }) => {
    const { quantity } = cartItem;
    const { name, salePrice } = cartItem.product;

    return (
        <div className="checkout-product-tile">
            <div className="inner-tile">
                <div className="item-quantity">
                    <Button basic className="btn-quantity">
                        <span>{`${quantity}x`}</span>
                    </Button>
                </div>
                <div className="item-info">
                    <div className="product-name">{name}</div>
                </div>
                <div className="item-subtotal">
                    <div className="subtotal-amount">{formatPrice(salePrice * quantity)}</div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProductTile;
