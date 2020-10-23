import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import CartIcon from './CartIcon';

const CardButton = ({ cartAmount, showCartButton }) => {
    const history = useHistory();
    if (showCartButton && cartAmount > 0) {
        return (
            <div className="card-button" onClick={() => history.push('/cart')}>
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
const ConnectedCardButton = connect(mapStateToProps)(CardButton);

export default ConnectedCardButton;
