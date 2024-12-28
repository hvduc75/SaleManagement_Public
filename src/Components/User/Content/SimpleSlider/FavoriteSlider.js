import React from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import styles from "./general.module.scss"
import ProductCard from '../ProductCard/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../../GlobalStyles/CustomSlider/CustomSlider';

const cx = classNames.bind(styles)

const FavoriteSlider = (props) => {
    const { listProducts } = props;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: listProducts.length < 6 ? listProducts.length : 6,
        slidesToScroll: listProducts.length < 6 ? listProducts.length : 6,
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider {...settings}>
            {listProducts && listProducts.length > 0 ? (
                listProducts.map((product) => {
                    return (
                        <div className={cx('style_card')}>
                            <ProductCard key={product.id} product={product} />
                        </div>
                    );
                })
            ) : (
                <div>No products available.</div>
            )}
        </Slider>
    );
};

export default FavoriteSlider;
