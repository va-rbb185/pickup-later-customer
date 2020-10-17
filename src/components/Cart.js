import React from 'react';
import PageHeader from './PageHeader';
import ProductTile from './ProductTile';
import Recommendation from './Recommendation';
import { Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

const Cart = () => {
    let history = useHistory();
    return (
        <div className="cart inner-page">
            <PageHeader pageTitle="Giỏ hàng của bạn" />
            <div className="products">
                {[0, 1, 2, 3].map(index => <ProductTile key={index} />)}
            </div>
            <Recommendation />
            <div className="cart-summary">
                <div className="subtotal">
                    <div className="subtotal-label">Tổng cộng:</div>
                    <div className="subtotal-value">100,000 đ</div>
                </div>
                <Button color="green" onClick={() => history.push('/checkout')}>Tiến hành Thanh toán</Button>
            </div>
        </div>
    );
};

export default Cart;
