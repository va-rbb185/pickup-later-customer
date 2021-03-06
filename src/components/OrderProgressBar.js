import React from 'react';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { OrderStatus } from '../enums';
import { getOrderStatusArray } from '../helpers';
import 'react-step-progress-bar/styles.css';

const OrderProgressBar = ({ orderStatus, orderProgress }) => {
    const allOrderStatus = getOrderStatusArray(orderStatus);
    const stepPercentage = 100 / (allOrderStatus.length - 1);
    const percentageAccomplished = stepPercentage * (orderProgress.length - 1);
    const reversedProgress = [...orderProgress].reverse();
    const unaccomplishedSteps = allOrderStatus.slice(orderProgress.length);
    const combinedSteps = [...reversedProgress, ...unaccomplishedSteps];

    return (
        <div className="order-progress-bar">
            <ProgressBar filledBackground="rgb(162,140,234)" percent={percentageAccomplished}>
                {combinedSteps.map((item, index) => {
                    return (
                        <Step key={`orderProgressStep_${index}_${item.status}`} transition="scale">
                            {
                                ({ accomplished }) => (
                                    <div className={`order-step${accomplished ? ' accomplished' : ''}`}>
                                        🟣
                                        <span className={`step-title${item.status === OrderStatus.CANCELED.value ? ' cancelled' : ''}`}>
                                            {OrderStatus[item.status].progressTitle}
                                        </span>
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
