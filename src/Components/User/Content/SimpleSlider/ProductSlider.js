import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';
import classNames from 'classnames/bind';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../../GlobalStyles/CustomSlider/CustomSlider';
import styles from './general.module.scss';

const cx = classNames.bind(styles);

const ProductSlider = (props) => {
    const { listProducts } = props;

    const settings = {
        dots: false,
        infinite: listProducts.DT?.length < 6 ? false : true,
        speed: 500,
        slidesToShow: listProducts.DT?.length < 6 ? listProducts.DT?.length : 6,
        slidesToScroll: listProducts.DT?.length < 6 ? listProducts.DT?.length : 6,
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider className={cx('customize-css')} {...settings}>
            {listProducts.DT && listProducts.DT.length > 0 ? (
                listProducts.DT.map((item) => {
                    return (
                        <div className={cx('style_card')}>
                            <ProductCard key={item.id} product={item} />
                        </div>
                    );
                })
            ) : (
                <div>No products available.</div>
            )}
        </Slider>
    );
};

export default ProductSlider;
