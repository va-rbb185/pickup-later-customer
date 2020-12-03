const PaymentStatus = {
    NEW: {
        value: 'NEW',
        title: 'Chưa thanh toán',
        indicatorColor: '#888'
    },
    PAID: {
        value: 'PAID',
        title: 'Đã thanh toán',
        indicatorColor: '#367ff5'
    },
    FAILED: {
        value: 'FAILED',
        title: 'Không thành công',
        indicatorColor: '#db2828'
    },
    REFUNDED: {
        value: 'REFUNDED',
        title: 'Đã hoàn tiền',
        indicatorColor: '#ed5426'
    }
};

export default PaymentStatus;
