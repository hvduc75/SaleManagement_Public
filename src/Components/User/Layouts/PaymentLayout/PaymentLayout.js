import React from 'react';
import classNames from 'classnames/bind';

import styles from './PaymentLayout.module.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function PaymentLayout(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <Outlet />
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>
        </div>
    );
}

export default PaymentLayout;
