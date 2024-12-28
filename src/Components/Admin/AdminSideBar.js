import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import images from '../../assets/images';
import { FaGem } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import { IoPersonSharp } from 'react-icons/io5';
import { FaImages, FaDiceD6 } from 'react-icons/fa6';
import { AiFillProduct } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import { MdDeviceHub } from 'react-icons/md';
import { TfiPackage } from 'react-icons/tfi';
import styles from './AdminSideBar.module.scss';

const cx = classNames.bind(styles);

const AdminSideBar = (props) => {
    const navigate = useNavigate();
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={images.bg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <DiReact size={'3em'} color={'00bfff'} />
                        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            Sale Management
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />}>
                            Trang chủ
                            <Link to="/admin" />
                        </MenuItem>
                        <MenuItem icon={<FaImages />}>
                            Quản lý Banner
                            <Link to="/admin/manage-banners" />
                        </MenuItem>
                        <MenuItem icon={<IoPersonSharp />}>
                            Quản lý người dùng
                            <Link to="/admin/manage-users" />
                        </MenuItem>
                        <MenuItem icon={<FaDiceD6 />}>
                            Quản lý danh mục
                            <Link to="/admin/manage-categories" />
                        </MenuItem>
                        <MenuItem icon={<TfiPackage />}>
                            Quản lý đơn hàng
                            <Link to="/admin/manage-orders" />
                        </MenuItem>
                        <SubMenu icon={<FaGem />} title="Quản lý sản phẩm">
                            <MenuItem icon={<AiFillProduct />}>
                                Quản lý sản phẩm
                                <Link to="/admin/manage-products" />
                            </MenuItem>
                            <MenuItem icon={<BiDetail />}>
                                Chi tiết sản phẩm
                                <Link to="/admin/manage-product-detail" />
                            </MenuItem>
                        </SubMenu>
                        <SubMenu icon={<MdDeviceHub />} title="Phân quyền">
                            <MenuItem icon={<AiFillProduct />}>
                                Thêm mới
                                <Link to="/admin/add-roles" />
                            </MenuItem>
                            <MenuItem icon={<BiDetail />}>
                                Gán quyền
                                <Link to="/admin/assign-roles" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className={cx('sidebar-btn-wrapper')}
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://sinhvien.huce.edu.vn/dashboard.html"
                            target="_blank"
                            className={cx('sidebar-btn')}
                            rel="noopener noreferrer"
                        >
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                }}
                            >
                                &#169; hvd75
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    );
};

export default AdminSideBar;
