import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import styles from './Profile.module.scss';
import { UpdateProfile, getUserById } from '../../../service/userApiService';
import { UpdateProfileSuccess } from '../../../redux/action/userAction';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.account);

    const [selectedDay, setSelectedDay] = useState();
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState();
    const [avatar, setAvatar] = useState();
    const [previewImage, setPreviewImage] = useState('');

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: new Date().getFullYear() - 1909 }, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        if (user.birthDay) {
            const birthDate = new Date(user.birthDay); 
            setSelectedDay(birthDate.getDate());
            setSelectedMonth(birthDate.getMonth() + 1);
            setSelectedYear(birthDate.getFullYear());
        }
        setUserName(user.name || '');
        setGender(user.gender);
    }, [user.birthDay, user.name, user.gender]);
    

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

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setPreviewImage(URL.createObjectURL(file));
            setAvatar(file);
        }
    };

    const handleSave = async () => {
        let birthDay =
            selectedDay && selectedMonth && selectedYear
                ? `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
                : null;
        let birthDayDateTime = birthDay ? new Date(birthDay) : null;
        if (
            birthDayDateTime &&
            birthDayDateTime.getFullYear() === selectedYear &&
            birthDayDateTime.getMonth() + 1 === selectedMonth &&
            birthDayDateTime.getDate() === selectedDay
        ) {
        } else {
            birthDayDateTime = null;
        }

        let data = await UpdateProfile(user.id, userName, gender, avatar, birthDayDateTime);
        if (data.EC !== 0) {
            toast.error(data.EM);
        } else {
            let data = await getUserById(user.id);
            dispatch(UpdateProfileSuccess(data));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Thông tin tài khoản</div>
                <div className={cx('content')}>
                    <div className={cx('info')}>
                        <table>
                            <tr>
                                <td className={cx('title')}>Tên đăng nhập</td>
                                <td className={cx('property')}>{user.username}</td>
                            </tr>
                            <tr>
                                <td className={cx('title')}>Tên</td>
                                <td className={cx('property')}>
                                    <input
                                        value={userName}
                                        className={cx('input_Name')}
                                        type="text"
                                        onChange={(event) => setUserName(event.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('title')}>Email</td>
                                <td className={cx('property')}>{user.email}</td>
                            </tr>
                            <tr>
                                <td className={cx('title')}>Số điện thoại</td>
                                <td className={cx('property')}>{user.phone}</td>
                            </tr>
                            <tr>
                                <td className={cx('title')}>Giới tính</td>
                                <td className={cx('property', 'gender')}>
                                    <input
                                        id="Male"
                                        name="gender"
                                        value="0"
                                        type="radio"
                                        checked={gender === 0 || (gender === undefined && user.gender === 0)}
                                        onChange={() => setGender(0)}
                                    />
                                    <label htmlFor="Male">Nam</label>

                                    <input
                                        id="Female"
                                        name="gender"
                                        value="1"
                                        type="radio"
                                        checked={gender === 1 || (gender === undefined && user.gender === 1)}
                                        onChange={() => setGender(1)}
                                    />
                                    <label htmlFor="Female">Nữ</label>

                                    <input
                                        id="other"
                                        name="gender"
                                        value="2"
                                        type="radio"
                                        checked={gender === 2 || (gender === undefined && user.gender === 2)}
                                        onChange={() => setGender(2)}
                                    />
                                    <label htmlFor="other">Khác</label>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('title')}>Ngày sinh</td>
                                <td className={cx('property', 'birthDay')}>
                                    <select
                                        className={cx('css_select')}
                                        id="day"
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(Number(e.target.value))}
                                    >
                                        <option value="">Ngày</option>
                                        {days.map((day) => (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className={cx('css_select')}
                                        id="month"
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                    >
                                        <option value="">Tháng</option>
                                        {months.map((month) => (
                                            <option key={month} value={month}>
                                                {month}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        className={cx('css_select')}
                                        id="year"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                                    >
                                        <option value="">Năm</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('title')}></td>
                                <td id="submitChange" className={cx('property')}>
                                    <button onClick={handleSave}>Lưu thay đổi</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className={cx('avatar')}>
                        <img
                            className={cx('prevImage')}
                            src={
                                previewImage ||
                                getImageSrc(user.image) ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s'
                            }
                            alt="prevImage"
                        />
                        <input type="file" onChange={handleUploadImage} id="user_avatar" hidden />
                        <label className={cx('btnUpload')} htmlFor="user_avatar">
                            Chọn Ảnh
                        </label>
                        <span>Dụng lượng file tối đa 1 MB</span>
                        <span>Định dạng:.JPEG, .PNG</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
