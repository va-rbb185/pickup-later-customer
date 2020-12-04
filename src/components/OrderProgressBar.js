import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { OrderStatus } from '../enums';
import { getOrderStatusArray } from '../helpers';
import 'react-step-progress-bar/styles.css';

const OrderProgressBar = ({ orderProgress }) => {
    const allOrderStatus = getOrderStatusArray();
    const stepPercentage = 100 / (allOrderStatus.length - 1);
    const percentageAccomplished = stepPercentage * (orderProgress.length - 1);
    const reversedProgress = [...orderProgress].reverse();
    const unaccomplishedSteps = allOrderStatus.slice(orderProgress.length);
    const combinedSteps = [...reversedProgress, ...unaccomplishedSteps];

    return (
        <div className="order-progress-bar">
            <ProgressBar filledBackground="rgb(162,140,234)" percent={percentageAccomplished}>
                {combinedSteps.map(item => {
                    return (
                        <Step transition="scale">
                            {
                                ({ accomplished }) => (
                                    <div className={`order-step${accomplished ? ' accomplished' : ''}`}>
                                        🟣
                                        <span>{OrderStatus[item.status].title}</span>
                                    </div>
                                )
                            }
                        </Step>
                    );
                })}
            </ProgressBar>
        </div>
    );
};

export default OrderProgressBar;
