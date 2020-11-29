import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CartIcon from './CartIcon';

const CartButton = ({ cartAmount, showCartButton }) => {
    if (showCartButton && cartAmount !== 0) {
        return (
            <div className="cart-button">
                <Link to="/cart">
                    <button className="ui circular button cart-float-button">
                        <div className="cart-float-button-icon">
                            <CartIcon />
                        </div>
                        <span>{cartAmount}</span>
                    </button>
                </Link>
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
