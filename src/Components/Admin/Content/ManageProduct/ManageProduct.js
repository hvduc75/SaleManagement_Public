import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Select from 'react-select';

import styles from './ManageProduct.module.scss';
import { getAllCategories } from '../../../../service/categoryApiService';
import { getAllProductsWithCategory } from '../../../../service/productApiService';
import TableProductPaginate from './TableProduct/TableProductPaginate';
import AddNewProducts from './AddProduct/AddNewProducts';
import ModalUpdateProduct from './UpdateProduct/ModalUpdateProduct';
import ModalDeleteProduct from './DeleteProduct/ModalDeleteProduct';

const cx = classNames.bind(styles);

function ManageProduct(props) {
    const LIMIT_PRODUCT = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [listCategories, setListCategories] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [showModalUpdateProduct, setShowModalUpdateProduct] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false);

    useEffect(() => {
        fetchListCategories();
        fetListProductsWithPaginate();
    }, []);

    useEffect(() => {
        fetListProductsWithPaginate(1);
    }, [selectedCategory]);

    const fetchListCategories = async () => {
        let data = await getAllCategories();
        if (data && data.EC === 0) {
            let categories = data.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListCategories(categories);
        }
    };

    const fetListProductsWithPaginate = async (page) => {
        let data = await getAllProductsWithCategory(page, LIMIT_PRODUCT, +selectedCategory.value);
        if (data && data.EC === 0) {
            setListProducts(data.DT.products);
            setPageCount(data.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (product) => {
        setShowModalUpdateProduct(true);
        setDataUpdate(product);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    const handleClickBtnDelete = (product) => {
        setDataDelete(product);
        setShowModalDeleteProduct(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h4>Add New Product For Category</h4>
            </div>
            <div className={cx('form-add-product')}>
                <div className={cx('select-category')}>
                    <Select defaultValue={selectedCategory} onChange={setSelectedCategory} options={listCategories} />
                </div>
                <AddNewProducts
                    listCategories={listCategories}
                    selectedCategory={selectedCategory}
                    fetListProductsWithPaginate={fetListProductsWithPaginate}
                />
            </div>
            <hr />
            <div className={cx('table-product')}>
                <div className={cx('title-table')}>
                    {selectedCategory.label
                        ? `Danh Sách Sản Phẩm Của ${selectedCategory.label}`
                        : `Chọn Danh Mục Để Xem Chi Tiết`}
                </div>
                <TableProductPaginate
                    listProducts={listProducts}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                    pageCount={pageCount}
                    fetListProductsWithPaginate={fetListProductsWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <ModalUpdateProduct
                show={showModalUpdateProduct}
                setShow={setShowModalUpdateProduct}
                fetListProductsWithPaginate={fetListProductsWithPaginate}
                resetUpdateData={resetUpdateData}
                dataUpdate={dataUpdate}
                currentPage={currentPage}
                selectedCategory={selectedCategory}
            />
            <ModalDeleteProduct
                show={showModalDeleteProduct}
                setShow={setShowModalDeleteProduct}
                fetListProductsWithPaginate={fetListProductsWithPaginate}
                dataDelete={dataDelete}
                currentPage={currentPage}
            />
        </div>
    );
}

export default ManageProduct;
