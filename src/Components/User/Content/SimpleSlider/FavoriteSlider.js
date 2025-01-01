import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';
import classNames from 'classnames/bind';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../../GlobalStyles/CustomSlider/CustomSlider';
import styles from "./general.module.scss"

const cx = classNames.bind(styles)

const FavoriteSlider = (props) => {
    const { listProducts } = props;

    const settings = {
        dots: false,
        infinite: listProducts.Products?.length < 6 ? false : true,
        speed: 500,
        slidesToShow: listProducts.Products?.length < 6 ? listProducts.Products?.length : 6,
        slidesToScroll: listProducts.Products?.length < 6 ? listProducts.Products?.length : 6,  
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider className={cx('customize-css')} {...settings}>
            {listProducts.Products && listProducts.Products.length > 0 ? (
                listProducts.Products.map((product) => {
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
