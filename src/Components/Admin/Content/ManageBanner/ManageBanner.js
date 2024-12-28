import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageBanner.module.scss';
import { FcPlus } from 'react-icons/fc';
import ModalCreateBanner from './AddBanner/ModalCreateBanner';
import TableBannerPaginate from './TableBanner/TableBannerPaginate';
import { getBannerWithPaginate } from '../../../../service/bannerApiService';
import ModalUpdateBanner from './UpdateBanner/ModalUpdateBanner';
import ModalDeleteBanner from './DeleteBanner/ModalDeleteBanner';

const cx = classNames.bind(styles);

function ManageBanner(props) {
    const LIMIT_USER = 5;
    const [listBanners, setListBanners] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [showModalCreateBanner, setShowModalCreateBanner] = useState(false);
    const [showModalUpdateBanner, setShowModalUpdateBanner] = useState(false);
    const [showModalDeleteBanner, setShowModalDeleteBanner] = useState(false);

    useEffect(() => {
        fetchListBannersWithPaginate(1);
    }, []);

    const fetchListBannersWithPaginate = async (page) => {
        let res = await getBannerWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListBanners(res.DT.banners);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (banner) => {
        setShowModalUpdateBanner(true);
        setDataUpdate(banner);
    };

    const handleClickBtnDelete = (banner) => {
        setShowModalDeleteBanner(true);
        setDataDelete(banner);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Manage Banner</div>
            <div className={cx('banner-content')}>
                <div className={cx('btn-add-new')}>
                    <button className={cx('btn btn-primary')} onClick={() => setShowModalCreateBanner(true)}>
                        <div className={cx('btn-add')}>
                            <FcPlus className={cx('icon_plus')} />
                            <span>Add new banner</span>
                        </div>
                    </button>
                </div>
                <div className={cx('table-banner-container')}>
                    <TableBannerPaginate
                        listBanners={listBanners}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListBannersWithPaginate={fetchListBannersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateBanner
                    show={showModalCreateBanner}
                    setShow={setShowModalCreateBanner}
                    fetchListBannersWithPaginate={fetchListBannersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateBanner
                    show={showModalUpdateBanner}
                    setShow={setShowModalUpdateBanner}
                    fetchListBannersWithPaginate={fetchListBannersWithPaginate}
                    resetUpdateData={resetUpdateData}
                    dataUpdate={dataUpdate}
                    currentPage={currentPage}
                />
                <ModalDeleteBanner
                    show={showModalDeleteBanner}
                    setShow={setShowModalDeleteBanner}
                    dataDelete={dataDelete}
                    fetchListBannersWithPaginate={fetchListBannersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageBanner;
