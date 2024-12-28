import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import { IoCartOutline } from 'react-icons/io5';
import { AiFillHome } from 'react-icons/ai';
import { SlLocationPin } from 'react-icons/sl';
import Account from './Account/Account';
import Search from './Search/Search';

const cx = classNames.bind(styles);

function Header(props) {
    const [isActiveHome, setIsActiveHome] = useState(false);
    const quantity_product = useSelector((state) => state.cart.cart.products.length);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userInfor = useSelector((state) => state.user.userInfor);
    const navigate = useNavigate();

    const handleClickHome = () => {
        navigate('/');
        setIsActiveHome(true);
    };

    const handleClickCart = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/cart');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Link to={'/'} className={cx('tiki-logo')}>
                    <img src={images.logo} alt="logo-tiki" style={{ height: '40px', width: '96px' }} />
                    <span className={cx('logo-desc')}>Tốt & Nhanh</span>
                </Link>
            </div>
            <div className={cx('header-right')}>
                <div className={cx('header-top')}>
                    <Search />
                    <div className={cx('user-shortcut')}>
                        <div
                            onClick={() => handleClickHome()}
                            className={
                                isActiveHome && window.location.pathname === '/' ? cx('home', 'activeHome') : cx('home')
                            }
                        >
                            <AiFillHome className={cx('shortcut-icon')} />
                            <span>Trang chủ</span>
                        </div>
                        <Account />
                        <div onClick={() => handleClickCart()} className={cx('cart')}>
                            <IoCartOutline className={cx('shortcut-icon')} />
                            <span className={cx('itemCart')}>{isAuthenticated ? quantity_product : 0}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('header-bottom')}>
                    <div className={cx('quick-links')}>
                        <span>điện gia dụng</span>
                        <span>xe cộ</span>
                        <span>mẹ & bé</span>
                        <span>khỏe đẹp</span>
                        <span>nhà cửa</span>
                        <span>sách</span>
                        <span>thể thao</span>
                    </div>
                    {Object.keys(userInfor).length !== 0 && userInfor.id && (
                        <div className={cx('location')}>
                            <SlLocationPin className={cx('icon')} />
                            <h4 className={cx('title')}>Giao đến:</h4>
                            <div
                                className={cx('address')}
                            >{`${userInfor.commune}, ${userInfor.district}, ${userInfor.province}`}</div>
                        </div>
                    )}
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Header;
