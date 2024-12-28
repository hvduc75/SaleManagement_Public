import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ManageOrder.module.scss';
import TableOrderPaginate from './TableOrder/TableOrder';
import TableConfirmOrder from './TableOrder/TableConfirmOrder';
import { getAllOrderPaginate } from '../../../../service/orderApiService';

const cx = classNames.bind(styles);

function ManageOrder(props) {
    const LIMIT_ORDER = 7;
    const [isActive, setIsActive] = useState('confirmOrder');
    const [listOrders, setListOrders] = useState([]);
    const [listOrdersConfirm, setListOrdersConfirm] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCountConfirm, setPageCountConfirm] = useState(0);
    const [dateSearch, setDateSearch] = useState('');

    useEffect(() => {
        fetchListOrdersWithPaginate(1);
        fetchListOrdersConfirmWithPaginate(1);
    }, []);

    const fetchListOrdersWithPaginate = async (page, date) => {
        let res = await getAllOrderPaginate(page, LIMIT_ORDER, null ,date);
        if (res.EC === 0) {
            setListOrders(res.DT.orders);
            setPageCount(res.DT.totalPages);
        }
    };

    const fetchListOrdersConfirmWithPaginate = async (page, date) => {
        let res = await getAllOrderPaginate(page, LIMIT_ORDER, 'Chưa Xác Nhận', date);
        if (res.EC === 0) {
            setListOrdersConfirm(res.DT.orders);
            setPageCountConfirm(res.DT.totalPages);
        }
    };

    const handleActiveItem = (value) => {
        setIsActive(value);
        setDateSearch('mm/dd/yyyy'); 

        if (value === "confirmOrder") {
            fetchListOrdersConfirmWithPaginate(1, null);
        } else {
            fetchListOrdersWithPaginate(1, null);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div
                    className={isActive === 'confirmOrder' ? cx('tab_item', 'item_active') : cx('tab_item')}
                    onClick={() => handleActiveItem('confirmOrder')}
                >
                    Xác nhận đơn hàng
                </div>
                <div
                    className={isActive === 'infoOrder' ? cx('tab_item', 'item_active') : cx('tab_item')}
                    onClick={() => handleActiveItem('infoOrder')}
                >
                    Thông tin các đơn hàng
                </div>
            </div>
            <div className={cx('content')}>
                <input
                    className={cx('date_search')}
                    type="date"
                    value={dateSearch}
                    onChange={(event) => {
                        setDateSearch(event.target.value);
                        fetchListOrdersWithPaginate(currentPage, event.target.value);
                        fetchListOrdersConfirmWithPaginate(currentPage, event.target.value);
                    }}
                />
                {isActive === 'confirmOrder' && (
                    <div className={cx('confirmOrder')}>
                        <TableConfirmOrder
                            listOrdersConfirm={listOrdersConfirm}
                            fetchListOrdersConfirmWithPaginate={fetchListOrdersConfirmWithPaginate}
                            pageCountConfirm={pageCountConfirm}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
                {isActive === 'infoOrder' && (
                    <div className={cx('infoOrder')}>
                        <TableOrderPaginate
                            listOrders={listOrders}
                            fetchListOrdersWithPaginate={fetchListOrdersWithPaginate}
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ManageOrder;
