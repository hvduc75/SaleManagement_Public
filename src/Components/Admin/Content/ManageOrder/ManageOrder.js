import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';

import styles from './ManageOrder.module.scss';
import images from '../../../../assets/images';
import { IoMdSearch } from 'react-icons/io';
import { getAllOrderByCondition, confirmOrder, getOrdersBySearchText } from '../../../../service/orderApiService';
import { vnpay_refund } from '../../../../service/paymentService';
import ConfirmDeliveredOrder from './ConfirmDeliveredOrder/ConfirmDeliveredOrder';

const cx = classNames.bind(styles);

function ManageOrder() {
    const navigate = useNavigate();
    const LIMIT_ORDER = 7;

    const user = useSelector((state) => state.user.account);
    const [listOrders, setListOrders] = useState([]);
    const [productsVisible, setProductsVisible] = useState({});
    const [activeTab, setActiveTab] = useState('All');
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [disable, setDisable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [orderId, setOrderId] = useState();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchListOrders(currentPage, activeTab);
    }, [activeTab, currentPage]);

    const fetchListOrders = async (page, tab) => {
        const orders = await getAllOrderByCondition(page, LIMIT_ORDER, tab);
        if (orders.EC === 0) {
            setListOrders(orders.DT.orders || []);
            setPageCount(Math.ceil(orders.DT.total / LIMIT_ORDER) || 1);
            setCurrentPage(page);

            const initialVisibility = {};
            orders.DT.orders.forEach((order) => {
                initialVisibility[order.id] = 2;
            });
            setProductsVisible(initialVisibility);
        }
    };

    const getImageSrc = (image) => {
        if (image?.data) {
            const byteArray = new Uint8Array(image.data);
            const binary = byteArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toLocaleString('vi-VN') : '0';
    };

    const handleOnclickTab = (name) => {
        setActiveTab(name);
        setCurrentPage(1);
    };

    const handleShowMoreProducts = (orderId) => {
        setProductsVisible((prevState) => ({
            ...prevState,
            [orderId]: prevState[orderId] + 2,
        }));
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    const handleConfirmOrder = async (order) => {
        let data = await confirmOrder(order.id);
        if (data.EC === 0) {
            toast.success('Confirm Order Success');
            fetchListOrders(1, activeTab);
        } else {
            toast.error(data.EM);
        }
    };

    const handleViewOrderDetail = (orderId) => {
        navigate(`/admin/order/view/${orderId}`);
    };

    const handleCancelOrder = async (id) => {
        alert(`Huy don hang cho don co id ${id}`);
    };

    const handleRefund = async (order) => {
        setDisable(true);
        try {
            const transDate = moment(order.order_date).format('YYYYMMDDHHmmss');
            let data = await vnpay_refund(order.id, transDate, order.total_price, user.username);

            if (data.EC === 0) {
                toast.success('Hoàn tiền thành công');
                fetchListOrders(1, activeTab);
            } else {
                toast.error(data.EM);
            }
        } catch (error) {
            console.error('Refund Error:', error.message || error);
            toast.error('Có lỗi xảy ra trong quá trình hoàn tiền.');
        }
        setDisable(false);
    };

    const handleDelivered = async (order) => {
        setDisable(true);
        setShowModal(true);
        setOrderId(order.id);
        setDisable(false);
    };

    const handleSearchOrder = async () => {
        if (searchText) {
            let orders = await getOrdersBySearchText(null, activeTab, searchText);
            if (orders.EC === 0) {
                setListOrders(orders.DT);
                const initialVisibility = {};
                orders.DT.forEach((order) => {
                    initialVisibility[order.id] = 2;
                });
                setProductsVisible(initialVisibility);
            }
        } else {
            fetchListOrders(1, activeTab);
        }
    };

    return (
        <p>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('header_tab')}>
                        {['All', 'Processing', 'Shipping', 'Delivered', 'Canceled'].map((tab) => (
                            <div
                                key={tab}
                                onClick={() => handleOnclickTab(tab)}
                                className={cx(activeTab === tab ? 'style_tab_active' : 'style_tab')}
                            >
                                {tab === 'All' && 'Tất cả đơn'}
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

                    {listOrders.length > 0 ? (
                        listOrders.map((order, index) => {
                            const visibleProductsCount = productsVisible[order.id] || 2;
                            const totalProducts = order.Products?.length || 0;

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
                                        {order.Products?.slice(0, visibleProductsCount).map((product) => (
                                            <div className={cx('listProduct')} key={product.id}>
                                                <div className={cx('product')}>
                                                    <div className={cx('detail')}>
                                                        <div
                                                            className={cx('product_img')}
                                                            style={{
                                                                backgroundImage: `url(${getImageSrc(product.image)})`,
                                                            }}
                                                        >
                                                            <span className={cx('quantity')}>
                                                                x{product.Order_Product?.quantity || 0}
                                                            </span>
                                                        </div>
                                                        <div className={cx('product_info')}>
                                                            <p>{product.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className={cx('price')}>
                                                        <span>{formatPrice(+product.Order_Product?.price || 0)}đ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
                                            <div className={cx('total')}>{formatPrice(+order.total_price || 0)}đ</div>
                                        </div>
                                        <div className={cx('group_button')}>
                                            {order.order_status === 0 &&
                                                (order.payment_status === 1 || order.payment_status === 0) &&
                                                activeTab === 'Processing' && (
                                                    <>
                                                        <div
                                                            className={cx('btn_cancel', 'btn')}
                                                            onClick={() => handleCancelOrder(order.id)}
                                                        >
                                                            Hủy đơn hàng
                                                        </div>
                                                        <div
                                                            className={cx('btn_confirm', 'btn')}
                                                            onClick={() => handleConfirmOrder(order)}
                                                        >
                                                            Xác nhận
                                                        </div>
                                                    </>
                                                )}
                                            {order.order_status === 3 &&
                                                order.payment_status === 1 &&
                                                activeTab === 'Canceled' && (
                                                    <div
                                                        className={cx('btn_confirm', 'btn', { disabled: disable })}
                                                        onClick={() => !disable && handleRefund(order)}
                                                    >
                                                        {disable ? 'Đang xử lý...' : 'Hoàn tiền'}
                                                    </div>
                                                )}
                                            {order.order_status === 1 && activeTab === 'Shipping' && (
                                                <div
                                                    className={cx('btn_confirm', 'btn', { disabled: disable })}
                                                    onClick={() => !disable && handleDelivered(order)}
                                                >
                                                    {disable ? 'Đang xử lý...' : 'Đã giao'}
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
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            <ConfirmDeliveredOrder
                show={showModal}
                setShow={setShowModal}
                orderId={orderId}
                fetchListOrders={fetchListOrders}
                activeTab={activeTab}
            />
        </p>
    );
}

export default ManageOrder;
