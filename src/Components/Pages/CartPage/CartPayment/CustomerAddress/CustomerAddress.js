import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './CustomerAddress.module.scss';

const cx = classNames.bind(styles);

function CustomerAddress(props) {
    const phone = useSelector((state) => state.user.account.phone);
    const username = useSelector((state) => state.user.account.username);
    const userInfor = useSelector((state) => state.user.userInfor);
    
    return userInfor.id !== undefined ? (
        <div className={cx('location')}>
            <div className={cx('block_header')}>
                <div className={cx('header_title')}>Giao tới</div>
                <Link to={'/checkout/shipping'} className={cx('btn_change')}>
                    Thay đổi
                </Link>
            </div>
            <div className={cx('customer_info')}>
                <p className={cx('customer_name')}>{username}</p>
                <i></i>
                <p className={cx('customer_phone')}>{phone}</p>
            </div>
            <div className={cx('address')}>
                <span className={cx('address_type')}>{userInfor.typeAddress === 'home' ? 'Nhà' : 'Cơ quan'}</span>
                {`${userInfor.address}, ${userInfor.commune}, ${userInfor.district}, ${userInfor.province}`}
            </div>
        </div>
    ) : (
        <div></div>
    );
}

export default CustomerAddress;
