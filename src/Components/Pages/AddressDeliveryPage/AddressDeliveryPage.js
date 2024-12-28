import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import style from './AddressDeliveryPage.module.scss';
import CreateAddressDelivery from './CreateAddressDelivery/CreateAddressDelivery';
import UpdateAddressDelivery from './UpdateAddressDelivery/UpdateAddressDelivery';
import { GetUserInforSuccess } from '../../../redux/action/userAction';
import { getListUserInfo, updateUserInfor, getUserInforDefault } from '../../../service/userInforApiService';
import { toast } from 'react-toastify';

const cx = classNames.bind(style);

function AddressDeliveryPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state) => state.user.account);
    const userInfor = useSelector((state) => state.user.userInfor);
    const [hideForm, setHireForm] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const [listUserInfo, setListUserInfo] = useState([]);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetchListUserInfo();
    }, [userInfor]);

    const fetchListUserInfo = async () => {
        let data = await getListUserInfo(account.id);
        if (data.EC === 0) {
            setListUserInfo(data.DT);
        }
    };

    const handleKeepAddress = async (item) => {
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
            'ChooseAddress',
        );
        if (data.EC === 0) {
            let userInfor = await getUserInforDefault(account.id);
            dispatch(GetUserInforSuccess(userInfor));
        }
        navigate('/cart');
    };

    const handleCreateForm = () => {
        setHireForm(false);
        setCreateForm(true);
    };

    const handleHireForm = (item) => {
        setUserInfo(item);
        setHireForm(true);
        setCreateForm(false);
    };

    const handleDeleteAddress = async (item) => {
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
            {userInfor.id !== undefined ? (
                <div className={cx('container')}>
                    <div className={cx('address_list')}>
                        <h3 className={cx('title')}>2. Địa chỉ giao hàng</h3>
                        <h5 className={cx('address_list_text')}>Chọn địa chỉ giao hàng có sẵn bên dưới: </h5>
                        <div className={cx('address_list')}>
                            {listUserInfo &&
                                listUserInfo.length > 0 &&
                                [...listUserInfo]
                                    .sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0))
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className={item.isDefault ? cx('address_item_default') : cx('address_item')}
                                        >
                                            <p className={cx('name')}>{item.userName}</p>
                                            <p
                                                className={cx('address')}
                                            >{`Địa chỉ: ${item.address}, ${item.commune}, ${item.district}, ${item.province}`}</p>
                                            <p className={cx('address')}>Việt Nam</p>
                                            <p className={cx('phone')}>{`Điện thoại: ${item.phone}`}</p>
                                            <p className={cx('action')}>
                                                <button
                                                    onClick={() => handleKeepAddress(item)}
                                                    className={
                                                        item.isDefault
                                                            ? cx('btn', 'saving_address_default')
                                                            : cx('btn', 'saving_address')
                                                    }
                                                >
                                                    Giao đến địa chỉ này
                                                </button>
                                                <button
                                                    onClick={() => handleHireForm(item)}
                                                    className={cx('btn', 'edit_address')}
                                                >
                                                    Sửa
                                                </button>
                                                {!item.isDefault && (
                                                    <button
                                                        onClick={() => handleDeleteAddress(item)}
                                                        className={cx('btn', 'edit_address')}
                                                    >
                                                        Xóa
                                                    </button>
                                                )}
                                            </p>
                                        </div>
                                    ))}
                        </div>
                    </div>
                    <div className={cx('add_new')}>
                        Bạn muốn giao hàng đến địa chỉ khác?{' '}
                        <span onClick={() => handleCreateForm()}>Thêm địa chỉ giao hàng mới</span>
                    </div>
                    {hideForm && <UpdateAddressDelivery setHireForm={setHireForm} userInfo={userInfo} />}
                    {createForm && <CreateAddressDelivery />}
                </div>
            ) : (
                <CreateAddressDelivery />
            )}
        </div>
    );
}

export default AddressDeliveryPage;
