const OrderStatus = {
    NEW: {
        value: 'NEW',
        title: 'Mới tạo đơn',
        indicatorColor: '#ed5426'
    },
    RECEIVED: {
        value: 'RECEIVED',
        title: 'Mới nhận đơn',
        indicatorColor: '#ed5426'
    },
    CONFIRMED: {
        value: 'CONFIRMED',
        title: 'Đã xác nhận',
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
