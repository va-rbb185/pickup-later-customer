import React from 'react';
import { Button } from 'semantic-ui-react';
import { formatPrice } from '../helpers';

const OrderProductTile = ({ orderProduct }) => {
    const { productName, quantity, price, subtotal } = orderProduct;
    return (
        <div className="order-product-tile">
            <div className="inner-tile">
                <div className="item-quantity">
                    <Button basic className="btn-quantity">
                        <span>{quantity}</span>
                    </Button>
                </div>
                <div className="item-info">
                    <div className="product-name">{productName}</div>
                </div>
                <div className="item-pricing">
                    <div className="price">x {formatPrice(price)}</div>
                    <div className="subtotal">{formatPrice(subtotal)}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderProductTile;
