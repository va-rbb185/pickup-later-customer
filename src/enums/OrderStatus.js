const OrderStatus = {
    NEW: {
        value: 'NEW',
        title: 'Tạo đơn',
        indicatorColor: '#ed5426'
    },
    RECEIVED: {
        value: 'RECEIVED',
        title: 'Nhận đơn',
        indicatorColor: '#ed5426'
    },
    CONFIRMED: {
        value: 'CONFIRMED',
        title: 'Xác nhận',
        indicatorColor: '#367ff5'
    },
    AVAILABLE: {
        value: 'AVAILABLE',
        title: 'Sẵn sàng giao',
        indicatorColor: '#367ff5'
    },
    COMPLETED: {
        value: 'COMPLETED',
        title: 'Đã lấy',
        indicatorColor: '#4db856'
    },
    CANCELED: {
        value: 'CANCELED',
        title: 'Đã huỷ',
        indicatorColor: '#db2828'
    }
};

export default OrderStatus;
