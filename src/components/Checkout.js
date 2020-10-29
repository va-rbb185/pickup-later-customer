import React from 'react';
import PageHeader from './PageHeader';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { checkoutResources } from '../static/resources';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faUser, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkout = () => {
    let history = useHistory();
    return (
        <div className="checkout inner-page">
            <PageHeader>{checkoutResources.PAGE_TITLE}</PageHeader>
            <div className="checkout-content">
                <div className="checkout-section customer-details">
                    <div className="section-header">{checkoutResources.CUSTOMER_DETAIL_TITLE}</div>
                    <div className="section-body">
                        <div className="customer-field">
                            <div className="field-icon">
                                <FontAwesomeIcon icon={faUser} size="3x" />
                            </div>
                            <div className="field-input"></div>
                        </div>
                        <div className="customer-field">
                            <div className="field-icon">
                                <FontAwesomeIcon icon={faMobileAlt} size="3x" />
                            </div>
                            <div className="field-input"></div>
                        </div>
                        <div className="customer-field">
                            <div className="field-icon">
                                <FontAwesomeIcon icon={faStickyNote} size="3x" />
                            </div>
                            <div className="field-input"></div>
                        </div>
                    </div>
                </div>
                <div className="checkout-section order-summary">
                    <div className="section-header">{checkoutResources.ORDER_SUMMARY_TITLE}</div>
                    <div className="section-body">{checkoutResources.ORDER_SUMMARY_TITLE}</div>
                </div>
                <div className="checkout-section payment-methods">
                    <div className="section-header">{checkoutResources.PAYMENT_DETAIL_TITLE}</div>
                    <div className="section-body">{checkoutResources.PAYMENT_DETAIL_TITLE}</div>
                </div>
                <div className="order-placement">
                    <div className="subtotal">
                        <div className="label">{checkoutResources.SUBTOTAL_LABEL}</div>
                        <div className="values">
                            <div className="value">100,000 đ</div>
                            <div className="original-value"><s>110,000 đ</s></div>
                        </div>
                    </div>
                    <Button color="green" onClick={() => history.push('/')}>{checkoutResources.PLACE_ORDER}</Button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
