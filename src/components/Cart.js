import React from 'react';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';
import Recommendation from './Recommendation';
import { Button } from 'semantic-ui-react';

const Cart = () => {
    return (
        <div className="cart inner-page">
            <PageHeader pageTitle="Giỏ hàng của bạn" />
            <div className="products">
                <ProductTile />
                <ProductTile />
            </div>
            <Recommendation />
            <div className="cart-summary">
                <div className="subtotal">
                    <div className="subtotal-label">Tổng cộng:</div>
                    <div className="subtotal-value">100,000 đ</div>
                </div>
                <Button color="green">Tiến hành Thanh toán</Button>
            </div>
        </div>
    );
};

export default Cart;
