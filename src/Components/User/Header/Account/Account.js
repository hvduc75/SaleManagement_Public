import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { FaRegFaceSmileWink } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

import { UserLogoutSuccess } from '../../../../redux/action/userAction';
import { logout } from '../../../../service/authService';
import styles from './Account.module.scss';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Account(props) {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const user = useSelector((state) => state.user.account);
    const dispatch = useDispatch();

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

    const handleLogout = async () => {
        dispatch(UserLogoutSuccess());
        await logout();
        navigate('/login');
    };

    const handlePageChange = (page) => {
        sessionStorage.removeItem('activeTab');
        sessionStorage.setItem('pageItem', page);
    };

    return (
        <div className={cx('wrapper')}>
            {!isAuthenticated ? (
                <Link to={'/login'} className={cx('account')}>
                    <FaRegFaceSmileWink className={cx('shortcut-icon')} />
                    <span>Tài Khoản</span>
                </Link>
            ) : (
                <Tippy
                    interactive
                    // delay={[0, 700]}
                    // offset={[12, 8]}
                    placement="bottom-end"
                    render={(attrs) => (
                        <div className={cx('account-content')} tabIndex="-1" {...attrs}>
                            <Link
                                to="/account/info"
                                onClick={() => handlePageChange('account-info')}
                                className={cx('menu-item')}
                            >
                                Thông tin tài khoản
                            </Link>
                            <Link
                                to="/order/history"
                                onClick={() => handlePageChange('order-history')}
                                className={cx('menu-item')}
                            >
                                Đơn hàng của tôi
                            </Link>
                            <Link to="/help-center" className={cx('menu-item')}>
                                Trung tâm hỗ trợ
                            </Link>
                            <div
                                onClick={() => {
                                    handleLogout();
                                }}
                                className={cx('menu-item')}
                            >
                                Đăng xuất
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('account')}>
                        {user.image && user.image.data ? (
                            <img src={getImageSrc(user.image)} alt="avatar" />
                        ) : (
                            <FaRegFaceSmileWink className={cx('shortcut-icon')} />
                        )}
                        <span>Tài Khoản</span>
                    </div>
                </Tippy>
            )}
        </div>
    );
}

export default Account;
