import React from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Content.module.scss';
import TopDeal from './TopDeal/TopDeal';
import Banners from './Banners/Banners';
import FavoriteProduct from './FavoriteProduct/FavoriteProduct';
import ProductInterest from './ProductInterest/ProductInterest';
import AllProduct from './AllProduct/AllProduct';
import FooterContent from './FooterContent/FooterContent';

const cx = classNames.bind(styles);

function Content() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banners />
            </div>
            <div className={cx('top_deal')}>
                <TopDeal />
            </div>
            {isAuthenticated && (
                <div className={cx('favorite_product')}>
                    <ProductInterest />
                </div>
            )}
            <div className={cx('favorite_product')}>
                <FavoriteProduct />
            </div>
            <div className={cx('all_product')}>
                <AllProduct/>
            </div>
            <div className={cx('footer_content')}>
                <FooterContent/>
            </div>
        </div>
    );
}

export default Content;
