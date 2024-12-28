import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageCategory.module.scss';
import { FcPlus } from 'react-icons/fc';
import ModalCreateCategory from './AddCategory/ModalCreateCategory';
import TableCategoryPaginate from './TableCategory/TableCategoryPaginate';
import { getCategoryWithPaginate } from '../../../../service/categoryApiService';
import ModalUpdateCategory from './UpdateCategory/ModalUpdateCategory';
import ModalDeleteCategory from './DeleteCategory/ModalDeleteCategory';

const cx = classNames.bind(styles);

function ManageCategory(props) {
    const LIMIT_CATEGORY = 5;
    const [listCategories, setListCategories] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
    const [showModalUpdateCategory, setShowModalUpdateCategory] = useState(false);
    const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);

    useEffect(() => {
        fetchListCategoriesWithPaginate(1);
    }, []);

    const fetchListCategoriesWithPaginate = async (page) => {
        let res = await getCategoryWithPaginate(page, LIMIT_CATEGORY);
        if (res.EC === 0) {
            setListCategories(res.DT.categories);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (banner) => {
        setShowModalUpdateCategory(true);
        setDataUpdate(banner);
    };

    const handleClickBtnDelete = (banner) => {
        setShowModalDeleteCategory(true);
        setDataDelete(banner);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Manage Category</div>
            <div className={cx('category-content')}>
                <div className={cx('btn-add-new')}>
                    <button className={cx('btn btn-primary')} onClick={() => setShowModalCreateCategory(true)}>
                        <div className={cx('btn-add')}>
                            <FcPlus className={cx('icon_plus')} />
                            <span>Add new category</span>
                        </div>
                    </button>
                </div>
                <div className={cx('table-category-container')}>
                    <TableCategoryPaginate
                        listCategories={listCategories}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListCategoriesWithPaginate={fetchListCategoriesWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateCategory
                    show={showModalCreateCategory}
                    setShow={setShowModalCreateCategory}
                    fetchListCategoriesWithPaginate={fetchListCategoriesWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateCategory
                    show={showModalUpdateCategory}
                    setShow={setShowModalUpdateCategory}
                    fetchListCategoriesWithPaginate={fetchListCategoriesWithPaginate}
                    resetUpdateData={resetUpdateData}
                    dataUpdate={dataUpdate}
                    currentPage={currentPage}
                />
                <ModalDeleteCategory
                    show={showModalDeleteCategory}
                    setShow={setShowModalDeleteCategory}
                    dataDelete={dataDelete}
                    fetchListCategoriesWithPaginate={fetchListCategoriesWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} 
                 /> 
            </div>
        </div>
    );
}

export default ManageCategory;
