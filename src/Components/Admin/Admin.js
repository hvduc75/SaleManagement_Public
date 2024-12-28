import { useState } from 'react';
import classNames from 'classnames/bind';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { FaBars } from 'react-icons/fa';
import styles from './Admin.module.scss';
import { logout } from '../../service/authService';
import { UserLogoutSuccess } from '../../redux/action/userAction';
import "react-perfect-scrollbar/dist/css/styles.css";
import AdminSideBar from './AdminSideBar';

const cx = classNames.bind(styles);

function Admin(props) {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(UserLogoutSuccess());
        await logout();
        navigate('/login');
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('admin-sidebar')}>
                <AdminSideBar collapsed={collapsed} />
            </div>
            <div className={cx('admin-content')}>
                <div className={cx('admin-header')}>
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className={cx('admin-main')}>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
