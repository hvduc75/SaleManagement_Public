import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

import styles from './ProductCard.module.scss';
import { createUserProduct } from '../../../../service/productApiService';

const cx = classNames.bind(styles);

function ProductCard(props) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const id = useSelector((state) => state.user.account.id);
    const { product, cssText, cssPrice } = props;

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

    const backgroundSrc = getImageSrc(product.background);
    const imageSrc = getImageSrc(product.image);

    // const formatPrice = (price) => {
    //     const cleanedPrice = price.replace(/,/g, '').replace(/\./g, ',');
    //     return parseFloat(cleanedPrice).toLocaleString('vi-VN');
    // };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const handlePressProducts = async (productId) => {
        if (!isAuthenticated) {
            return;
        }
        let data = await createUserProduct(`${id}`, productId);
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {product && (
                <Link
                    to={`/product/${product.id}`}
                    onClick={() => handlePressProducts(product.id)}
                    className={cx('product-item')}
                    key={product.id}
                >
                    <div className={cx('wrapper-image')}>
                        <div
                            className={cx('bg-image')}
                            style={{
                                backgroundImage: backgroundSrc ? `url(${backgroundSrc})` : 'none',
                            }}
                        ></div>
                        <img className={cx('product-image')} src={imageSrc} alt={product.name} />
                    </div>
                    <div className={cx('product-content')}>
                        <div className={cx('product-description')}>
                            <div className={cx('description-top')}>
                                <div className={cx('product-name', cssText)}>{product.name}</div>
                                <div className={cx('product-rating')}>
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar key={index} className={cx('product-star')} />
                                    ))}
                                </div>
                            </div>
                            <div className={cx('description-bot')}>
                                <div className={cx('product-price-new', cssPrice)}>
                                    {product.price_current
                                        ? formatPrice(product.price_current)
                                        : formatPrice(product.price)}
                                    <sup>đ</sup>
                                </div>
                                <div className={cx('product-sale')}>
                                    <div
                                        className={
                                            product.sale ? cx('percent-sale') : cx('percent-sale-off')
                                        }
                                    >
                                        {product.sale ? product.sale + '%' : ''}
                                    </div>
                                    <div className={cx('product-price-old')}>
                                        {product.price_current ? formatPrice(product.price) : ''}
                                        {product.price_current ? <sup>đ</sup> : <sup></sup>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('product-footer')}>
                            <span>Giao siêu tốc 2h</span>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default ProductCard;
