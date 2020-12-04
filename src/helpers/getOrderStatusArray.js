import { OrderStatus } from "../enums";

const getOrderStatusArray = () => [
    { status: OrderStatus.NEW.value },
    { status: OrderStatus.RECEIVED.value },
    { status: OrderStatus.CONFIRMED.value },
    { status: OrderStatus.AVAILABLE.value },
    { status: OrderStatus.COMPLETED.value }
];

export default getOrderStatusArray;
