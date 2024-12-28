import React from 'react';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../../Header/Header';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container_header')}>
                <div className={cx('inner')}>
                    <Header />
                </div>
            </div>
            <div className={cx('container')}>
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
