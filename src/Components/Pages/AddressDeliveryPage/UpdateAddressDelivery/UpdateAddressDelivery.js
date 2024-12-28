import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import style from './UpdateAddressDelivery.module.scss';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { GetUserInforSuccess } from '../../../../redux/action/userAction';
import { updateUserInfor, getUserInforDefault } from '../../../../service/userInforApiService';

const cx = classNames.bind(style);

function UpdateAddressDelivery(props) {
    const dispatch = useDispatch();
    const { setHireForm, userInfo } = props;

    const [provinceCode, setProvinceCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [communeCode, setCommuneCode] = useState('');
    const [address, setAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [radioValue, setRadioValue] = useState('');
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
        } catch (error) {
            console.error('Error fetching provinces:', error);
        }
    };

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.userName || '');
            setPhone(userInfo.phone || '');
            setAddress(userInfo.address || '');
            setRadioValue(userInfo.typeAddress || '');
            setIsDefault(userInfo.isDefault || false);
        }
    }, [userInfo]);

    useEffect(() => {
        if (userInfo?.province && listProvince.length > 0) {
            const province = listProvince.find((item) => item.name === userInfo.province);
            if (province) {
                setProvinceCode(province.code);
            }
        }
    }, [userInfo?.province, listProvince]);

    useEffect(() => {
        fetchDistricts();
    }, [provinceCode]);

    const fetchDistricts = async () => {
        if (provinceCode) {
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
                const data = await response.json();
                setListDistrict(data.districts || []);
            } catch (error) {
                console.error('Error fetching districts:', error);
            }
        }
    };

    useEffect(() => {
        if (userInfo?.district && listDistrict.length > 0) {
            const district = listDistrict.find((item) => item.name === userInfo.district);
            if (district) {
                setDistrictCode(district.code);
            }
        }
    }, [userInfo?.district, listDistrict]);

    useEffect(() => {
        fetchCommunes();
    }, [districtCode]);

    const fetchCommunes = async () => {
        if (districtCode) {
            try {
                const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
                const data = await response.json();
                setListCommune(data.wards || []);
            } catch (error) {
                console.error('Error fetching communes:', error);
            }
        }
    };

    useEffect(() => {
        if (userInfo?.commune && listCommune.length > 0) {
            const commune = listCommune.find((item) => item.name === userInfo.commune);
            if (commune) {
                setCommuneCode(commune.code);
            }
        }
    }, [userInfo?.commune, listCommune]);

    const handleProvinceChange = async (e) => {
        setProvinceCode(e.target.value);
        setDistrictCode('');
        setCommuneCode('');
    };

    const handleDistrictChange = async (e) => {
        setDistrictCode(e.target.value);
        setCommuneCode('');
    };

    const handleRadioChange = (value) => {
        setRadioValue(value);
    };

    const validatePhone = (phone) => {
        return /^0\d{9}$/.test(phone);
    };

    const handleUpdate = async () => {
        if (!validatePhone(phone)) {
            toast.error('Số điện thoại phải bắt đầu với 0 và có 10 số');
            return;
        }

        if (!provinceCode) {
            toast.error('Vui lòng nhập đầy đủ thông tin');
            return;
        }
        const provinceName = listProvince.find((item) => item.code === +provinceCode)?.name || '';
        const districtName = listDistrict.find((item) => item.code === +districtCode)?.name || '';
        const communeName = listCommune.find((item) => item.code === +communeCode)?.name || '';

        let data = await updateUserInfor(
            userName,
            phone,
            provinceName,
            districtName,
            communeName,
            address,
            radioValue,
            isDefault,
            account.id,
            userInfo.id,
        );

        if (data && data.EC === 0) {
            toast.success('Địa chỉ đã cập nhật thành công');
            setHireForm(false);
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
                        className={cx('style_input')}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className={cx('style_form_item')}>
                    <label>Điện thoại di động</label>
                    <input
                        type="text"
                        value={phone}
                        className={cx('style_input')}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('style_form_item')}>
                    <label>Tỉnh/Thành phố</label>
                    <select value={provinceCode} className={cx('style_input')} onChange={handleProvinceChange}>
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
                        <button onClick={() => setHireForm(false)} className={cx('btn_cancel')}>
                            Hủy bỏ
                        </button>
                        <button onClick={handleUpdate} className={cx('btn_update')}>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateAddressDelivery;
