import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import style from './CreateAddressDelivery.module.scss';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { GetUserInforSuccess } from '../../../../redux/action/userAction';
import { postCreateNewUserInfor, getUserInforDefault } from '../../../../service/userInforApiService';

const cx = classNames.bind(style);

function CreateAddressDelivery(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [radioValue, setRadioValue] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [communeCode, setCommuneCode] = useState('');
    const [address, setAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listCommune, setListCommune] = useState([]);

    const account = useSelector((state) => state.user.account);

    useEffect(() => {
        fetchProvinces();
    }, []);

    const fetchProvinces = async () => {
        try {
            const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
            const data = await response.json();
            setListProvince(data);
            setUserName(account.username);
            setPhone(account.phone);
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    const handleProvinceChange = async (e) => {
        const selectedProvinceCode = e.target.value;
        setProvinceCode(selectedProvinceCode);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`);
            const data = await response.json();
            setListDistrict(data.districts || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const handleDistrictChange = async (e) => {
        const selectedDistrictCode = e.target.value;
        setDistrictCode(selectedDistrictCode);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`);
            const data = await response.json();
            setListCommune(data.wards || []);
        } catch (error) {
            console.error('Error fetching communes:', error);
        }
    };

    const handleRadioChange = (value) => {
        setRadioValue(value);
    };

    const validatePhone = (phone) => {
        return /^0\d{9}$/.test(phone);
    };

    const handleAddNew = async () => {
        if (!validatePhone(phone)) {
            toast.error('Số điện thoại phải bắt đầu với 0 và có 10 số');
            return;
        }

        if (!provinceCode) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const provinceName = listProvince.find((item) => item.code === +provinceCode).name;
        const districtName = listDistrict.find((item) => item.code === +districtCode).name;
        const communeName = listCommune.find((item) => item.code === +communeCode).name;

        console.log(provinceName, districtName, communeName, address, radioValue, isDefault, account.id);

        let data = await postCreateNewUserInfor(
            userName,
            phone,
            provinceName,
            districtName,
            communeName,
            address,
            radioValue,
            isDefault,
            account.id,
        );
        if (data && data.EC === 0) {
            toast.success('Địa chỉ của bạn đã được thêm thành công');
            navigate('/checkout/payment');
            let userInfor = await getUserInforDefault(account.id);
            dispatch(GetUserInforSuccess(userInfor));
        } else {
            toast.error(data.EM);
        }
    };
    return (
        <div className={cx('address_form')}>
            <div className={cx('form_container')}>
                <div className={cx('style_form_item')}>
                    <label>Họ tên</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={cx('style_input')}
                    />
                </div>
                <div className={cx('style_form_item')}>
                    <label>Điện thoại di động</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={cx('style_input')}
                    />
                </div>
                <div className={cx('style_form_item')}>
                    <label>Tỉnh/Thành phố</label>
                    <select className={cx('style_input')} onChange={handleProvinceChange}>
                        <option value="">Chọn Tỉnh/Thành Phố</option>
                        {listProvince.map((province) => (
                            <option key={province.code} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('style_form_item')}>
                    <label>Quận/Huyện</label>
                    <select value={districtCode} className={cx('style_input')} onChange={handleDistrictChange}>
                        <option value="">Chọn Quận/Huyện</option>
                        {listDistrict.map((district) => (
                            <option key={district.code} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('style_form_item')}>
                    <label>Phường/Xã</label>
                    <select
                        value={communeCode}
                        className={cx('style_input')}
                        onChange={(e) => setCommuneCode(e.target.value)}
                    >
                        <option value="">Chọn Phường/Xã</option>
                        {listCommune.map((commune) => (
                            <option key={commune.code} value={commune.code}>
                                {commune.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('style_form_item')}>
                    <label>Địa chỉ</label>
                    <textarea
                        type="textarea"
                        placeholder="Ví dụ : Ngọc Chấn"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        className={cx('style_area')}
                    />
                </div>
                <div className={cx('style_form_item')}>
                    <label></label>
                    <span style={{ fontSize: '11px', fontStyle: 'italic' }}>
                        Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.
                    </span>
                </div>
                <div className={cx('style_form_item')}>
                    <label>Loại địa chỉ</label>
                    <span className={cx('address_type')}>
                        <label style={{ cursor: 'pointer', fontSize: '12px', width: '50%', fontWeight: '500' }}>
                            <label htmlFor="home" className={cx('radio_fake')}>
                                <input
                                    type="radio"
                                    id="home"
                                    name="delivery_address_type"
                                    style={{ display: 'none' }}
                                    onChange={() => handleRadioChange('home')}
                                />
                                <span>
                                    {radioValue === 'home' ? (
                                        <IoMdRadioButtonOn className={cx('btn_radio_on')} />
                                    ) : (
                                        <IoMdRadioButtonOff className={cx('btn_radio_off')} />
                                    )}
                                </span>
                            </label>
                            Nhà riêng / Chung cư
                        </label>
                        <label style={{ cursor: 'pointer', fontSize: '12px', width: '50%', fontWeight: '500' }}>
                            <label htmlFor="company" className={cx('radio_fake')}>
                                <input
                                    type="radio"
                                    id="company"
                                    name="delivery_address_type"
                                    style={{ display: 'none' }}
                                    onChange={() => handleRadioChange('company')}
                                />
                                <span>
                                    {radioValue === 'company' ? (
                                        <IoMdRadioButtonOn className={cx('btn_radio_on')} />
                                    ) : (
                                        <IoMdRadioButtonOff className={cx('btn_radio_off')} />
                                    )}
                                </span>
                            </label>
                            Cơ quan / Công ty
                        </label>
                    </span>
                </div>
                <div className={cx('style_form_item')}>
                    <label></label>
                    <label
                        htmlFor="address_default"
                        style={{
                            width: '66.66%',
                            display: 'flex',
                            alignItems: 'center',
                            fontWeight: '500',
                        }}
                    >
                        <input
                            type="checkbox"
                            id="address_default"
                            checked={isDefault}
                            onChange={() => setIsDefault(!isDefault)}
                            style={{ width: '19px', height: '19px', marginRight: '4px', marginLeft: '3px' }}
                        />
                        Sử dụng địa chỉ này làm mặc định.
                    </label>
                </div>
                <div className={cx('style_form_item')}>
                    <label></label>
                    <div className={cx('btn_group')}>
                        <button onClick={handleAddNew} className={cx('btn_update')}>
                            Thêm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAddressDelivery;
