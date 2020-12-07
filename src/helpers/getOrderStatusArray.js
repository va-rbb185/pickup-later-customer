import { OrderStatus } from "../enums";

const getOrderStatusArray = orderStatus => {
    return orderStatus === OrderStatus.CANCELED.value
        ? [
            { status: OrderStatus.NEW.value },
            { status: OrderStatus.RECEIVED.value },
            { status: OrderStatus.CANCELED.value }
        ]
        : [
            { status: OrderStatus.NEW.value },
            { status: OrderStatus.RECEIVED.value },
            { status: OrderStatus.CONFIRMED.value },
            { status: OrderStatus.AVAILABLE.value },
            { status: OrderStatus.COMPLETED.value }
        ];
};

export default getOrderStatusArray;
