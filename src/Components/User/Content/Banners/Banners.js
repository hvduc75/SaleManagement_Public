import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './Banners.module.scss';
import BannerSlider from '../SimpleSlider/BannerSlider';
import { getAllBannersWithStatus } from '../../../../service/bannerApiService';

const cx = classNames.bind(styles);

function Banners(props) {
    const [listBanners, setListBanners] = useState([]);

    useEffect(() => {
        fetchListBanners();
    }, []);

    const fetchListBanners = async () => {
        const data = await getAllBannersWithStatus(1);
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        setListBanners(data);
    };
    return (
        <div className={cx('wrapper')}>
            <BannerSlider listBanners={listBanners} slidesToShow={2} slidesToScroll={2} />
        </div>
    );
}

export default Banners;
