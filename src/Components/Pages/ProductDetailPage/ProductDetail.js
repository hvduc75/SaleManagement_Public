import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './ProductDetail.module.scss';
import { FaStar } from 'react-icons/fa6';
import images from '../../../assets/images';
import { getProductById } from '../../../service/productApiService';
import AddToCart from './AddToCart/AddToCart';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetchProductById();
    }, []);

    const fetchProductById = async () => {
        let data = await getProductById(productId);
        if (data && data.EC === 0) {
            setProduct(data.DT);
            console.log(product);
        } else {
            toast.error(data.EM);
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

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

    const imageSrc = getImageSrc(product.image);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product_container')}>
                <div className={cx('product_image')}>
                    <div className={cx('image_frame')}>
                        <img src={imageSrc} alt="ProductImage" />
                    </div>
                    <div className={cx('ThumbnailList')}>
                        <div className={cx('content')}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
                <div className={cx('product_content')}>
                    <div className={cx('product_info')}>
                        <div className={cx('infor_top')}>
                            <div className={cx('brandAuthor')}>
                                <div
                                    className={cx('text_badge')}
                                    style={{ color: 'rgb(255, 240, 241)', backgroundColor: '#D93843' }}
                                >
                                    10.10
                                </div>
                                <img src={images.pd_TopDeal} className={cx('webpimg_container')} alt="test" />
                                <img src={images.pd_FreeShip} className={cx('webpimg_container')} alt="test" />
                                <img src={images.pd_exchange} className={cx('webpimg_container')} alt="test" />
                                <img src={images.pd_real} className={cx('webpimg_container')} alt="test" />
                            </div>
                            <div className={cx('product_name')}>{product.name}</div>
                            <div className={cx('rating')}>
                                <div className={cx('review')}>
                                    <div
                                        style={{
                                            marginRight: '4px',
                                            fontSize: '14px',
                                            lineHeight: '150%',
                                            fontWeight: '500',
                                        }}
                                    >
                                        4.8
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                    </div>
                                    <div className={cx('number')}>(3531)</div>
                                </div>
                                <div className={cx('separator')}></div>
                                <div className={cx('quantity_sold')}>Đã bán 21k</div>
                            </div>
                        </div>
                        <div className={cx('infor_bot')}>
                            <div className={cx('product_price')}>
                                <div className={cx('current_price')}>
                                    {product.price_current ? formatPrice(+product.price_current) : formatPrice(+product.price)}
                                    <sup>đ</sup>
                                </div>
                                <div className={cx('discount_rate')}>{product.sale ? "-" + product.sale + "%" : ""}</div>
                                <div className={cx('discount_icon')}>
                                    <img
                                        style={{ width: '14px', height: '14px', opacity: '1' }}
                                        src={images.pd_coupon}
                                        alt="test"
                                    />
                                </div>
                                <div className={cx('original_price')}>
                                    {product.price_current ? formatPrice(+product.price) : ""}
                                    {product.price_current && <sup>đ</sup>}
                                </div>
                                <div className={cx('popup_3')}></div>
                            </div>
                            <div className={cx('coupon')}>
                                <div className={cx('title')}>Giá sau áp dụng mã khuyến mãi</div>
                                <div className={cx('discount_content')}>
                                    <img
                                        src={images.pd_coupon}
                                        style={{ width: '18px', height: '18px', opacity: '1' }}
                                        alt="test"
                                    />
                                    <div>
                                        <strong>
                                            Giảm 5.000<sup>đ</sup>
                                        </strong>
                                        <span style={{ color: '#808089' }}> từ mã khuyến mãi của nhà bán</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product_desc')}>
                        <div className={cx('title')}>Mô tả sản phẩm</div>
                        {product.ProductDetail && (
                            <div
                                className={cx('content')}
                                dangerouslySetInnerHTML={{ __html: product.ProductDetail.description }}
                            ></div>
                        )}
                    </div>
                </div>
            </div>
            <div style={{ position: 'sticky', top: '12px' }}>
                <AddToCart product={product} formatPrice={formatPrice} />
            </div>
        </div>
    );
}

export default ProductDetail;
