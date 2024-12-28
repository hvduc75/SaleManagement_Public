import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './ProductInterest.module.scss';
import { getAllProductsInterestOfUser } from '../../../../service/productApiService';
import FavoriteSlider from '../SimpleSlider/FavoriteSlider';

const cx = classNames.bind(styles);

function ProductInterest(props) {
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        fetchListProducts();
    }, []);

    const fetchListProducts = async () => {
        let data = await getAllProductsInterestOfUser();
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        setListProducts(data.DT[0].Products);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>Sản phẩm bạn quan tâm</span>
            </div>
            <div className={cx('content-container')}>
                <FavoriteSlider listProducts={listProducts} />
            </div>
        </div>
    );
}

export default ProductInterest;
