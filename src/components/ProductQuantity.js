import React from 'react';
import { connect } from 'react-redux';
import { addCartItem, removeCartItem } from '../actions';

class ProductQuantity extends React.Component {
    constructor(props) {
        super(props);
        this.onClickAddToCart = this.onClickAddToCart.bind(this);
        this.onClickRemoveFromCart = this.onClickRemoveFromCart.bind(this);
    }

    calculateQuantity() {
        const { amount, items } = this.props.cart;
        if (amount === 0) return 0;
        const foundItem = items.find(item => item.product.id === this.props.product.id);
        return foundItem ? foundItem.quantity : 0;
    }

    onClickAddToCart() {
        this.props.addCartItem(this.props.product);
    }

    onClickRemoveFromCart() {
        this.props.removeCartItem(this.props.product);
    }

    render() {
        const quantity = this.calculateQuantity();
        return (
            <div className="product-quantity">
                <button disabled={quantity === 0} type="button" className="ant-btn btn-quantity ant-btn-icon-only" onClick={this.onClickRemoveFromCart}>
                    <span role="img" aria-label="minus" className="anticon anticon-minus">
                        <svg viewBox="64 64 896 896" foscusable="false" className="" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                    </span>
                </button>
                <div className="quantity">{quantity}</div>
                <button disabled={quantity === 5} type="button" className="ant-btn btn-quantity ant-btn-icon-only" onClick={this.onClickAddToCart}>
                    <span role="img" aria-label="plus" className="anticon anticon-plus">
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <defs>
                                <style></style>
                            </defs>
                            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
                            <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
                        </svg>
                    </span>
                </button>
            </div>
        );
    }
};

const mapStateToProps = ({ cart }) => ({ cart });
const actions = {
    addCartItem,
    removeCartItem
};
const ConnectedProductQuantity = connect(mapStateToProps, actions)(ProductQuantity);

export default ConnectedProductQuantity;
