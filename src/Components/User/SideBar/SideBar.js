import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { getAllCategories } from '../../../service/categoryApiService';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar(props) {
    const [listCategories, setListCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchListCategories();
    }, []);

    const fetchListCategories = async () => {
        let data = await getAllCategories();
        setListCategories(data.DT);
    };

    const getImageSrc = (item) => {
        if (item && item.image && item.image.data) {
            const byteArray = new Uint8Array(item.image.data);
            let binary = '';
            byteArray.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const handleClickCategory = (categoryId) => {
        navigate(`/category/${categoryId}`)
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <span className={cx('category-title')}>Danh mục</span>
                {listCategories && listCategories.length > 0 ? (
                    listCategories.map((item, index) => {
                        const imageSrc = getImageSrc(item);
                        return (
                            <div
                                onClick={() => handleClickCategory(item.id)}
                                className={cx('category-child')}
                                key={index}
                            >
                                <div className={cx('category-image')}>
                                    <img className={cx('image')} src={imageSrc} alt={item.name} />
                                </div>
                                <span className={cx('category-name')}>{item.name}</span>
                            </div>
                        );
                    })
                ) : (
                    <div className={cx('category-child')}>
                        <p>No category available</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SideBar;
