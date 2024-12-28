import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './AccountLayout.module.scss';
import Header from '../../Header/Header';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoLocation } from 'react-icons/io5';
import { FaUserLarge, FaMessage } from 'react-icons/fa6';
import { RiBookReadFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';

const cx = classNames.bind(styles);

function AccountLayout(props) {
    const user = useSelector((state) => state.user.account);
    const [activeItem, setActiveItem] = useState('');
    const pageItem = sessionStorage.getItem('pageItem');

    useEffect(() => {
        setActiveItem(pageItem);
    }, [pageItem]);

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
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container_header')}>
                <div className={cx('inner')}>
                    <Header />
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('sidebar')}>
                    <div className={cx('avatar')}>
                        <img
                            src={
                                getImageSrc(user.image) ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s'
                            }
                            alt="avatar"
                        />
                        <div className={cx('info')}>
                            Tài khoản của <strong>{user.username}</strong>
                        </div>
                    </div>
                    <div className={cx('sidebar_item')}>
                        <Link
                            to={'/account/info'}
                            className={cx('item', { 'is-active': activeItem === 'account-info' })}
                            onClick={() => setActiveItem('account-info')}
                        >
                            <FaUserLarge className={cx('icon')} />
                            <span>Thông tin tài khoản</span>
                        </Link>
                        <Link
                            to={'/order/history'}
                            className={cx('item', { 'is-active': activeItem === 'order-history' })}
                            onClick={() => setActiveItem('order-history')}
                        >
                            <RiBookReadFill className={cx('icon')} />
                            <span>Quản lý đơn hàng</span>
                        </Link>
                        <Link
                            to={'/customer/address'}
                            className={cx('item', { 'is-active': activeItem === 'address-book' })}
                            onClick={() => setActiveItem('address-book')}
                        >
                            <IoLocation className={cx('icon')} />
                            <span>Sổ địa chỉ</span>
                        </Link>
                        <Link
                            to={'/feedback/product'}
                            className={cx('item', { 'is-active': activeItem === 'product-reviews' })}
                            onClick={() => setActiveItem('product-reviews')}
                        >
                            <FaMessage className={cx('icon')} />
                            <span>Đánh giá sản phẩm</span>
                        </Link>
                        <Link
                            className={cx('item', { 'is-active': activeItem === 'viewed-products' })}
                            onClick={() => setActiveItem('viewed-products')}
                        >
                            <FaEye className={cx('icon')} />
                            <span>Sản phẩm đã xem</span>
                        </Link>
                    </div>
                </div>
                <div className={cx('container')}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AccountLayout;
