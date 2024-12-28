import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './OrderHistory.module.scss';
import images from '../../../assets/images';
import { IoMdSearch } from 'react-icons/io';
import { getOrdersByUserId, cancelOrder, getOrdersBySearchText } from '../../../service/orderApiService';
import { paymentWithVnPay } from '../../../service/paymentService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function OrderHistory(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.account);
    const [listOrders, setListOrders] = useState([]);
    const [productsVisible, setProductsVisible] = useState({});
    const [activeTab, setActiveTab] = useState('All');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const savedActiveTab = sessionStorage.getItem('activeTab') || 'All';
        setActiveTab(savedActiveTab);
        fetchListOrders(savedActiveTab);
        sessionStorage.removeItem('activeTab');
    }, []);

    const fetchListOrders = async (tab) => {
        let orders = await getOrdersByUserId(user.id, tab);
        if (orders.EC === 0) {
            setListOrders(orders.DT);
            const initialVisibility = {};
            orders.DT.forEach((order) => {
                initialVisibility[order.id] = 2;
            });
            setProductsVisible(initialVisibility);
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

    const handleOnclickTab = async (tab) => {
        setSearchText('');
        setActiveTab(tab);
        fetchListOrders(tab);
    };

    const handleShowMoreProducts = (orderId) => {
        setProductsVisible((prevState) => ({
            ...prevState,
            [orderId]: prevState[orderId] + 2,
        }));
    };

    const handleViewOrderDetail = (orderId) => {
        sessionStorage.setItem('activeTab', activeTab);
        navigate(`/order/view/${orderId}`);
    };

    const handleBuyBack = async (order) => {
        let res = await paymentWithVnPay(order.total_price, order.id, 'NCB', 'vn');
        window.location.href = res.paymentUrl;
    };

    const handleCancelOrder = async (order) => {
        let data = await cancelOrder(order.id);
        if (data.EC === 0) {
            toast.success('Hủy đơn hàng thành công, vui lòng đợi hoàn tiền');
            handleOnclickTab(activeTab);
        } else {
            toast.error(data.EM);
        }
    };

    const handleSearchOrder = async () => {
        if (searchText) {
            let orders = await getOrdersBySearchText(user.id, activeTab, searchText);
            if (orders.EC === 0) {
                setListOrders(orders.DT);
                const initialVisibility = {};
                orders.DT.forEach((order) => {
                    initialVisibility[order.id] = 2;
                });
                setProductsVisible(initialVisibility);
            }
        } else {
            handleOnclickTab(activeTab);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Đơn hàng của tôi</div>
                <div className={cx('header_tab')}>
                    {['All', 'Payment', 'Processing', 'Shipping', 'Delivered', 'Canceled'].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => handleOnclickTab(tab)}
                            className={cx(activeTab === tab ? 'style_tab_active' : 'style_tab')}
                        >
                            {tab === 'All' && 'Tất cả đơn'}
                            {tab === 'Payment' && 'Chờ thanh toán'}
                            {tab === 'Processing' && 'Đang xử lý'}
                            {tab === 'Shipping' && 'Đang vận chuyển'}
                            {tab === 'Delivered' && 'Đã giao'}
                            {tab === 'Canceled' && 'Đã hủy'}
                        </div>
                    ))}
                </div>
                <div className={cx('header_search')}>
                    <IoMdSearch className={cx('search-icon')} />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchOrder()}
                        placeholder="Tìm đơn hàng theo Mã đơn hàng, Tên sản phẩm"
                    ></input>
                    <div className={cx('search_right')} onClick={() => handleSearchOrder()}>
                        Tìm đơn hàng
                    </div>
                </div>
                {listOrders && listOrders.length > 0 ? (
                    listOrders.map((order, index) => {
                        const visibleProductsCount = productsVisible[order.id] || 2;
                        const totalProducts = order.Products.length;

                        return (
                            <div className={cx('content')} key={order.id}>
                                <div className={cx('title')}>
                                    {order.order_status === 0
                                        ? 'Đang xử lý'
                                        : order.order_status === 1
                                        ? 'Đang giao'
                                        : order.order_status === 2
                                        ? 'Đã giao'
                                        : order.order_status === 3
                                        ? `Đã hủy ${
                                                  order.payment_status === 2
                                                      ? '- Hoàn tiền thành công'
                                                      : order.payment_status === 3
                                                      ? '- Quá thời gian thanh toán'
                                                      : order.payment_status === 0
                                                      ? ''
                                                      : '- Đang xử lý hoàn tiền vui lòng chờ'
                                              }`
                                        : order.payment_status === 0
                                        ? 'Chờ thanh toán'
                                        : 'Thành công'}
                                </div>
                                <div className={cx('orderInfo')}>
                                    {order.Products &&
                                        order.Products.slice(0, visibleProductsCount).map((product, index) => {
                                            return (
                                                <div className={cx('listProduct')} key={product.id}>
                                                    <div className={cx('product')}>
                                                        <div className={cx('detail')}>
                                                            <div
                                                                className={cx('product_img')}
                                                                style={{
                                                                    backgroundImage: `url(${getImageSrc(
                                                                        product.image,
                                                                    )})`,
                                                                }}
                                                            >
                                                                <span className={cx('quantity')}>
                                                                    x{product.Order_Product.quantity}
                                                                </span>
                                                            </div>
                                                            <div className={cx('product_info')}>
                                                                <p>{product.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('price')}>
                                                            <span>{formatPrice(+product.Order_Product.price)}đ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {totalProducts > visibleProductsCount && (
                                        <div
                                            className={cx('btn_more')}
                                            onClick={() => handleShowMoreProducts(order.id)}
                                        >
                                            <p>Xem thêm 2 sản phẩm</p>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('orderFooter')}>
                                    <div className={cx('total_price')}>
                                        <div className={cx('total_text')}>Tổng tiền: </div>
                                        <div className={cx('total')}>{formatPrice(+order.total_price)}đ</div>
                                    </div>
                                    <div className={cx('group_button')}>
                                        {order.payment_status === 0 && activeTab === 'Payment' && (
                                            <div
                                                className={cx('btn_buy_back', 'btn')}
                                                onClick={() => handleBuyBack(order)}
                                            >
                                                Thanh toán lại
                                            </div>
                                        )}
                                        {order.order_status === 0 && activeTab === 'Processing' && (
                                            <div
                                                className={cx('btn_cancel', 'btn')}
                                                onClick={() => handleCancelOrder(order)}
                                            >
                                                Hủy đơn hàng
                                            </div>
                                        )}
                                        <div
                                            className={cx('btn_see_detail', 'btn')}
                                            onClick={() => handleViewOrderDetail(order.id)}
                                        >
                                            Xem chi tiết
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className={cx('content')}>
                        <div className={cx('emptyOrder')}>
                            <img src={images.emptyOrder} alt="logo" />
                            <span>Chưa có đơn hàng</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrderHistory;
