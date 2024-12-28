import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import styles from './OrderDetail.module.scss';
import { getOrderDetail } from '../../../../../service/orderApiService';

const cx = classNames.bind(styles);

function OrderDetail(props) {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    // const user = useSelector((state) => state.user.account);
    let totalPrice = 0;
    let sale = 0;

    useEffect(() => {
        fetchOrderDetail();
    }, []);

    const fetchOrderDetail = async () => {
        let data = await getOrderDetail(orderId);
        if (data.EC === 0) {
            setOrderDetail(data.DT);
        }
    };

    const getImageSrc = (image) => {
        if (image && image.data) {
            const byteArray = new Uint8Array(image.data);
            let binary = '';
            byteArray.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const formatDateTime = (isoDate) => {
        if (!isoDate) return 'Chưa có thông tin';

        const date = new Date(isoDate);

        return date.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour12: false,
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>{`Chi tiết đơn hàng #${orderId}`}</div>
            <div className={cx('created_date')}>{`Ngày đặt hàng: ${formatDateTime(orderDetail.order_date)}`}</div>
            <div className={cx('group_section')}>
                <div className={cx('style_group')}>
                    <div className={cx('title')}>Địa chỉ người nhận</div>
                    <div className={cx('content')}>
                        <p className={cx('name')}>{orderDetail.User_Infor ? orderDetail.User_Infor.userName : ''}</p>
                        <p className={cx('address')}>
                            {orderDetail.User_Infor
                                ? `Địa chỉ: ${orderDetail.User_Infor.address}, ${orderDetail.User_Infor.commune}, ${orderDetail.User_Infor.district}, ${orderDetail.User_Infor.province}`
                                : 'Địa chỉ: Chưa có thông tin'}
                        </p>
                        <p className={cx('phone')}>{`Điện thoại: ${
                            orderDetail.User_Infor ? orderDetail.User_Infor.phone : ''
                        }`}</p>
                    </div>
                </div>
                <div className={cx('style_group')}>
                    <div className={cx('title')}>Hình thức thanh toán</div>
                    <div className={cx('content')}>
                        <p className={cx('')}>
                            {orderDetail.payment_method === 'NCB'
                                ? 'Thanh toán qua ứng dụng ngân hàng'
                                : 'Thanh toán khi nhận hàng'}
                        </p>
                        <p className={cx('description')}>
                            {orderDetail.payment_status === 1
                                ? 'Thanh toán thành công'
                                : orderDetail.payment_status === 0 && orderDetail.payment_method === 'NCB'
                                ? 'Thanh toán thất bại. Vui lòng thanh toán lại hoặc chọn phương thức thanh toán khác'
                                : orderDetail.payment_status === 3 
                                ? 'Đơn hàng hiện đã bị hủy'
                                : ''}
                        </p>
                    </div>
                </div>
            </div>
            <table className={cx('product_list')}>
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Giảm giá</th>
                        <th>Tạm tính</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetail.Products &&
                        orderDetail.Products.length > 0 &&
                        orderDetail.Products.map((product, index) => {
                            totalPrice += product.price * product.Order_Product.quantity;
                            if (product.sale) {
                                sale += (product.price * product.sale) / 100;
                            }
                            return (
                                <tr key={product.id}>
                                    <td className={cx('product_item')}>
                                        <img
                                            className={cx('product_item_image')}
                                            src={getImageSrc(product.image)}
                                            alt=""
                                        />
                                        <div className={cx('product_info')}>
                                            <span className={cx('product_name')}>{product.name}</span>
                                            {orderDetail.order_status === 3 && <Link to={'/'} className={cx('buy_back')}>
                                                Mua lại
                                            </Link>}
                                        </div>
                                    </td>
                                    <td className={cx('price')}>{formatPrice(+product.price)} đ</td>
                                    <td className={cx('quantity')}>{product.Order_Product.quantity}</td>
                                    <td className={cx('discount_amount')}>
                                        {formatPrice((product.price * product.sale) / 100)} đ
                                    </td>
                                    <td className={cx('raw_total')}>
                                        {formatPrice(product.price_current * product.Order_Product.quantity)} đ
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            <span>Tạm tính</span>
                        </td>
                        <td>{formatPrice(totalPrice)} đ</td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <span>Giảm giá</span>
                        </td>
                        <td>-{formatPrice(sale)} đ</td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <span>Tổng cộng</span>
                        </td>
                        <td>
                            <span className={cx('sum')}>{formatPrice(totalPrice - sale)} đ</span>
                        </td>
                    </tr>
                    {orderDetail.payment_method === 'NCB' && orderDetail.payment_status === 0 && (
                        <tr>
                            <td colSpan="4"></td>
                            <td>
                                <div title="Hủy đơn hàng" className={cx('cancel_order')}>
                                    Hủy đơn hàng
                                </div>
                            </td>
                        </tr>
                    )}
                </tfoot>
            </table>
        </div>
    );
}

export default OrderDetail;
