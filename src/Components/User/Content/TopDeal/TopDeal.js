import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './TopDeal.module.scss';
import images from '../../../../assets/images';
import ProductSlider from '../SimpleSlider/ProductSlider';
import { getAllProductsWithDeal } from '../../../../service/productApiService';

const cx = classNames.bind(styles);

function TopDeal(props) {
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        fetchListProducts();
    }, []);

    const fetchListProducts = async () => {
        let data = await getAllProductsWithDeal();
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        setListProducts(data);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <img className={cx('image-title')} src={images.TopDeal} alt="TopDeal" />
                <div className={cx('view-detail')}>Xem tất cả</div>
            </div>
            <div className={cx('content-container')}>
                <ProductSlider listProducts={listProducts} />
            </div>
        </div>
    );
}

export default TopDeal;
