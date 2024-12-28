import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '../../../../../assets/images/index';

const cx = classNames.bind(styles);

function Header(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={'/'}>
                        <img src={images.logo1} alt="logo" />
                    </Link>
                    <span className={cx('divider')}></span>
                    <span className={cx('title')}>{window.location.pathname === "/checkout/shipping" ? 'Địa chỉ giao hàng' : 'Thanh toán'}</span>
                </div>
                <div className={cx('hotline')}>
                    <div className={cx('hotline_styles')}>1900-6035</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
