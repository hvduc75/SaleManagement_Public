import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import style from './AddressBook.module.scss';
import { FiPlus } from 'react-icons/fi';
import { CiCircleCheck } from 'react-icons/ci';
import { getListUserInfo, updateUserInfor, getUserInforDefault } from '../../../service/userInforApiService';

const cx = classNames.bind(style);

function AddressBook(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const userInfor = useSelector((state) => state.user.userInfor);
    const [listUserInfo, setListUserInfo] = useState([]);

    useEffect(() => {
        fetchListUserInfo();
    }, [userInfor]);

    const fetchListUserInfo = async () => {
        let data = await getListUserInfo(account.id);
        if (data.EC === 0) {
            setListUserInfo(data.DT);
        }
    };

    const handleDelete = async (item) => {
        let cof = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?');
        if (cof) {
            let data = await updateUserInfor(
                item.userName,
                item.phone,
                item.province,
                item.district,
                item.commune,
                item.address,
                item.typeAddress,
                item.isDefault,
                account.id,
                item.id,
                'DeleteAddress',
            );
            if (data.EC === 0) {
                toast.success('Xóa địa chỉ thành công');
                fetchListUserInfo();
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Sổ địa chỉ</div>
                <div className={cx('content')}>
                    <div className={cx('add_address')}>
                        <Link to={'/customer/address/create'}>
                            <FiPlus />
                            <span>Thêm mới địa chỉ</span>
                        </Link>
                    </div>
                    <div className={cx('list_address')}>
                        {listUserInfo &&
                            listUserInfo.length > 0 &&
                            [...listUserInfo]
                                .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
                                .map((item, index) => (
                                    <div key={index} className={cx('address_item')}>
                                        <div className={cx('info')}>
                                            <div className={cx('name')}>
                                                {item.userName}
                                                {item.isDefault && (
                                                    <span>
                                                        <CiCircleCheck />
                                                        <span>Địa chỉ mặc định</span>
                                                    </span>
                                                )}
                                            </div>
                                            <div className={cx('address')}>
                                                <span>Địa chỉ: </span>
                                                {`${item.address}, ${item.commune}, ${item.district}, ${item.province}`}
                                            </div>
                                            <div className={cx('phone')}>
                                                <span>Điện thoại: </span>
                                                {item.phone}
                                            </div>
                                        </div>
                                        <div className={cx('action')}>
                                            <Link to={`edit/${item.id}`} state={{ item }} className={cx('edit')}>
                                                Chỉnh sửa
                                            </Link>
                                            {item.isDefault === false && (
                                                <button className={cx('delete')} onClick={() => handleDelete(item)}>
                                                    Xóa
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddressBook;
