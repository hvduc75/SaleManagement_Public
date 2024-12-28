import Slider from 'react-slick';
import classNames from 'classnames/bind';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './SimpleSlider.module.scss';
import { NextArrow, PrevArrow } from '../../../GlobalStyles/CustomSlider/CustomSlider';

const cx = classNames.bind(styles);

const BannerSlider = (props) => {
    const { listBanners, slidesToScroll, slidesToShow } = props;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
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

    return (
        <Slider {...settings}>
            {listBanners.DT && listBanners.DT.length > 0 ? (
                listBanners.DT.map((item, index) => {
                    const imageSrc = getImageSrc(item);
                    return (
                        <div className={cx('slider')} key={index}>
                            {imageSrc ? (
                                <img className={cx('slider-image')} src={imageSrc} alt={`Banner ${index}`} />
                            ) : (
                                <p>No image available</p>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className={cx('slider')}>
                    <p>No banners available</p>
                </div>
            )}
        </Slider>
    );
};

export default BannerSlider;
