import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import style from './PaymentStatus.module.scss';
import images from '../../../../assets/images';

const cx = classNames.bind(style);

const CheckoutStatus = () => {
    const [status, setStatus] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentStatus = queryParams.get('status');

        if (paymentStatus === 'success') {
            setStatus('success');
        } else {
            setStatus('failed');
        }
    }, [location]);

    const handleViewOrder = () => {
        sessionStorage.setItem('pageItem', 'order-history');
    };

    return (
        <div className={cx('wrapper')}>
            {status === 'success' ? (
                <div className={cx('success')}>
                    <img src={images.payment_Success} alt="payment_success" />
                    <span>Thanh toán thành công, bạn có thể xem chi tiết đơn hàng ở phần lịch sử mua</span>
                    <Link to={'/order/history'} onClick={() => handleViewOrder()} className={cx('view_order')}>
                        Xem đơn hàng
                    </Link>
                    <Link to={'/'} className={cx('continue_buy')}>
                        Tiếp tục mua sắm
                    </Link>
                </div>
            ) : (
                <div className={cx('failed')}>
                    <img src={images.payment_failed} alt="payment_failed" />
                    <span>Thanh toán thất bại</span>
                    <Link to={'/'} className={cx('continue_buy')}>
                        Tiếp tục mua sắm
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CheckoutStatus;
