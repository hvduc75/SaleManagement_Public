import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import { getAllProductsForHomePage } from '../../../../../service/productApiService';
import styles from './ProductsPage.module.scss';
import ProductCard from '../../ProductCard/ProductCard';

const cx = classNames.bind(styles);

const ProductsPage = () => {
    const LIMIT_PRODUCTS = 6;
    const [listProducts, setListProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        if (page > totalPages) return;
        setLoading(true);
        try {
            const response = await fetListProducts(page);
            setListProducts((prevProducts) => [...prevProducts, ...response.products]);
            setTotalPages(response.totalPages);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            toast.error('Có lỗi xảy ra trong quá trình tải sản phẩm.');
        } finally {
            setLoading(false);
        }
    };

    const fetListProducts = async (currentPage) => {
        let data = await getAllProductsForHomePage(currentPage, LIMIT_PRODUCTS);
        if (data && data.EC !== 0) {
            toast.error(data.EM);
            return { data: { products: [], totalPages: 0 } };
        }
        return data.DT;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product-item')}>
                {listProducts.length > 0 ? (
                    listProducts.map((product, index) => (
                        <div key={index}>
                            <ProductCard key={product.id} product={product} />
                        </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>
            {page <= totalPages && !loading && (
                <button className={cx('btn_load_more')} onClick={loadProducts}>
                    Xem thêm
                </button>
            )}
            {loading && <p>Đang tải...</p>}
        </div>
    );
};

export default ProductsPage;
