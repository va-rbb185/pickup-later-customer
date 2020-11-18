import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import CartIcon from './CartIcon';

const CartButton = ({ cartAmount, showCartButton }) => {
    const history = useHistory();
    if (showCartButton && cartAmount !== 0) {
        return (
            <div className="cart-button" onClick={() => history.push('/cart')}>
                <button className="ui circular button cart-float-button">
                    <div className="cart-float-button-icon">
                        <CartIcon />
                    </div>
                    <span>{cartAmount}</span>
                </button>
            </div >
        );
    }
    return null;
};

const mapStateToProps = ({ cart, showCartButton }) => ({
    cartAmount: cart.amount,
    showCartButton
});
const ConnectedCartButton = connect(mapStateToProps)(CartButton);

export default ConnectedCartButton;
