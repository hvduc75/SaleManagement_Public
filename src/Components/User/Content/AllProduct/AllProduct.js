import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import images from '../../../../assets/images';
import styles from './AllProduct.module.scss';
import ProductsPage from './AllProductContent.js/ProductsPage';

const cx = classNames.bind(styles);

function AllProduct() {
    const [isFixed, setIsFixed] = useState(false);
    const [isAtInitialPosition, setIsAtInitialPosition] = useState(false);
    const [initialPosition, setInitialPosition] = useState(null); // Vị trí ban đầu của header
    const [headerHeight, setHeaderHeight] = useState(null); // Chiều cao của header

    useEffect(() => {
        const header = document.getElementById('header');
        const containerProduct = document.getElementById('container_product');

        if (header && containerProduct) {
            setInitialPosition(header.offsetTop);
            setHeaderHeight(header.offsetHeight);
        }

        const handleScroll = () => {
            if (header && containerProduct) {
                const currentScroll = window.pageYOffset;

                // Điều kiện chuyển sang `fixed` khi cuộn xuống qua vị trí ban đầu của header
                if (currentScroll >= initialPosition) {
                    setIsFixed(true);
                }

                // Điều kiện chuyển về `initial` khi cuộn ngược lên và đáy của header chạm vào đỉnh container_product
                const headerBottomPosition = currentScroll + headerHeight;
                const containerTopPosition = containerProduct.offsetTop;

                if (headerBottomPosition <= containerTopPosition) {
                    setIsFixed(false);
                    setIsAtInitialPosition(true); // Xác định quay về trạng thái ban đầu
                } else {
                    setIsAtInitialPosition(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [initialPosition, headerHeight]);

    return (
        <div className={cx('wrapper')}>
            <div
                id="header"
                className={cx('header', isFixed ? 'fixed' : isAtInitialPosition ? 'initial' : '')}
            >
                <div className={cx('header_title')}>Gợi ý hôm nay</div>
                <div className={cx('header_item')}>
                    <div className={cx('tab_item', 'active_tab')}>
                        <img className={cx('logo_item')} src={images.Foryou} alt="test" />
                        <div className={cx('tab_text')}>Dành cho bạn</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.logoTd} alt="test" />
                        <div className={cx('tab_text')}>Top Deal</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.FreeShip} alt="test" />
                        <div className={cx('tab_text')}>Freeship 100k</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.book} alt="test" />
                        <div className={cx('tab_text')}>Sách Xả Kho - 60%</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.Appliance} alt="test" />
                        <div className={cx('tab_text')}>Gia Dụng - 50%</div>
                    </div>
                </div>
            </div>
            <div id="container_product" className={cx('container_product')}>
                <ProductsPage />
            </div>
        </div>
    );
}

export default AllProduct;