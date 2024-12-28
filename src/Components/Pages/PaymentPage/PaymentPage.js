import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './PaymentPage.module.scss';
import images from '../../../assets/images/index';
import { LuTruck } from 'react-icons/lu';
import { getProductsByCartId } from '../../../service/cartApiService';
import OrderPayment from './OrderPayment/OrderPayment';
import { PiWarningCircleLight } from 'react-icons/pi';

const cx = classNames.bind(styles);

function PaymentPage(props) {
    const cartId = useSelector((State) => State.cart.cartId);
    const [listProductChecked, setListProductChecked] = useState([]);
    const [totalPrice, setTotalPrice] = useState('');
    const [totalPriceOriginal, setTotalPriceOriginal] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const listProducts = listProductChecked.filter((item) => item.Product_Cart.isChecked === true);

    useEffect(() => {
        fetchListProductChecked();
    }, [cartId]);

    useEffect(() => {
        const newTotalPrice = listProducts.reduce((total, item) => {
            return (
                total +
                (item.price_current
                    ? +item.price_current * item.Product_Cart.quantity
                    : +item.price * item.Product_Cart.quantity)
            );
        }, 0);

        const newTotalPriceOriginal = listProducts.reduce((total, item) => {
            return total + +item.price * item.Product_Cart.quantity;
        }, 0);

        setTotalPrice(newTotalPrice);
        setTotalPriceOriginal(newTotalPriceOriginal);
    }, [listProductChecked]);

    const fetchListProductChecked = async () => {
        let data = await getProductsByCartId(cartId);
        if (data && data.EC === 0) {
            setListProductChecked(data.DT[0].Products);
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
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

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            {listProducts && listProducts.length <= 0 && (
                <div className={cx('warning')}>
                    <PiWarningCircleLight className={cx('css_icon')} />
                    <div className={cx('alert_content')}>Giỏ hàng không có sản phẩm. Vui lòng thực hiện lại.</div>
                </div>
            )}
            <div className={cx('wrapper_payment')}>
                <div className={cx('order_container')}>
                    <div className={cx('order_detail')}>
                        <h3 className={cx('order_title')}>Thông tin đơn hàng</h3>
                        <div className={cx('list_product')}>
                            <div className={cx('style_package')}>
                                <div className={cx('package_name')}>Danh sách các sản phẩm.</div>
                                <div className={cx('content_left')}>
                                    {listProducts &&
                                        listProducts.length > 0 &&
                                        listProducts.map((item, index) => {
                                            return (
                                                <div className={cx('package_item')} key={index}>
                                                    <img
                                                        className={cx('preview_image')}
                                                        src={getImageSrc(item.image)}
                                                        alt="image_item"
                                                    />
                                                    <div className={cx('item_info')}>
                                                        <div className={cx('first_line')}>{item.name}</div>
                                                        <div className={cx('second_line')}>
                                                            <div className={cx('item_qty')}>
                                                                SL: x{item.Product_Cart.quantity}
                                                            </div>
                                                            <div className={cx('item_price')}>
                                                                <span className={cx('price_original')}>
                                                                    {item.price_current
                                                                        ? formatPrice(+item.price) + ' đ'
                                                                        : ''}
                                                                </span>
                                                                <span>
                                                                    {item.price_current
                                                                        ? formatPrice(+item.price_current)
                                                                        : formatPrice(+item.price)}{' '}
                                                                    đ
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div className={cx('content_right')}>
                                    <div className={cx('fulfilment')}>
                                        <LuTruck className={cx('fulfilment_icon')} />
                                        <div className={cx('fulfilment_desc')}>
                                            Được giao bởi TikiNOW Smart Logistics (giao từ Hà Nội)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('method_payment')}>
                        <h3 className={cx('section_title')}>Chọn hình thức thanh toán</h3>
                        <div className={cx('list_method')}>
                            <input
                                id="method_1"
                                type="radio"
                                name="method_payment"
                                value="cash"
                                className={cx('style_radio')}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="method_1" className={cx('payment_container')}>
                                <img src={images.pm_cash} className={cx('icon')} alt="image_payment" />
                                <div className={cx('content')}>Thanh toán bằng tiền mặt</div>
                            </label>
                        </div>
                        <div className={cx('list_method')}>
                            <input
                                id="method_2"
                                type="radio"
                                name="method_payment"
                                value="viettel_money"
                                className={cx('style_radio')}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="method_2" className={cx('payment_container')}>
                                <img src={images.pm_viettel} className={cx('icon')} alt="image_payment" />
                                <div className={cx('content')}>Viettel Money</div>
                            </label>
                        </div>
                        <div className={cx('list_method')}>
                            <input
                                id="method_3"
                                type="radio"
                                name="method_payment"
                                value="momo"
                                className={cx('style_radio')}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="method_3" className={cx('payment_container')}>
                                <img src={images.pm_momo} className={cx('icon')} alt="image_payment" />
                                <div className={cx('content')}>Ví momo</div>
                            </label>
                        </div>
                        <div className={cx('list_method')}>
                            <input
                                id="method_4"
                                type="radio"
                                name="method_payment"
                                value="zalopay"
                                className={cx('style_radio')}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="method_4" className={cx('payment_container')}>
                                <img src={images.pm_zalopay} className={cx('icon')} alt="image_payment" />
                                <div className={cx('content')}>Ví ZaloPay</div>
                            </label>
                        </div>
                        <div className={cx('list_method')}>
                            <input
                                id="method_5"
                                type="radio"
                                name="method_payment"
                                value="vnpay"
                                className={cx('style_radio')}
                                onChange={handlePaymentMethodChange}
                            />
                            <label htmlFor="method_5" className={cx('payment_container')}>
                                <img src={images.pm_vnpay} className={cx('icon')} alt="image_payment" />
                                <div className={cx('content')}>VNPAY</div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={cx('order_payment')}>
                    <OrderPayment
                        formatPrice={formatPrice}
                        totalPrice={totalPrice}
                        totalPriceOriginal={totalPriceOriginal}
                        paymentMethod={paymentMethod}
                        listProducts={listProducts}
                    />
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
