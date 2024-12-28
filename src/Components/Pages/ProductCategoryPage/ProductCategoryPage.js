import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import styles from './ProductCategoryPage.module.scss';
import { getProductsByCategoryId } from '../../../service/productApiService';
import ProductCard from '../../User/Content/ProductCard/ProductCard';

const cx = classNames.bind(styles);

function ProductCategoryPage(props) {
    const [listProduct, setListProduct] = useState([]);
    const { categoryId } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Ngẫu nhiên');

    useEffect(() => {
        fetchListProducts();
    }, [categoryId]);

    const fetchListProducts = async () => {
        let products = await getProductsByCategoryId(categoryId);
        if (products && products.EC === 0) {
            setListProduct(products.DT);
        }
    };

    const handleSortSelect = (sortType) => {
        setSelectedSort(sortType);
        setIsDropdownOpen(false);

        let sortedProducts = [...listProduct.Products];

        switch (sortType) {
            case 'Giá thấp đến cao':
                sortedProducts.sort((a, b) => (a.price_current || a.price) - (b.price_current || b.price));
                break;
            case 'Giá cao đến thấp':
                sortedProducts.sort((a, b) => (b.price_current || b.price) - (a.price_current || a.price));
                break;
            default:
                sortedProducts = [...listProduct.Products];
                break;
        }

        setListProduct((prev) => ({ ...prev, Products: sortedProducts }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_category_top')}>
                <Link to={'/'} className={cx('path_home')}>
                    Trang chủ
                </Link>
                <IoIosArrowForward className={cx('icon')} />
                <div className={cx('current_path')}>{listProduct?.name}</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>{listProduct?.name}</h2>
                </div>
                <div className={cx('filter')}>
                    <div className={cx('sort')}>Sắp xếp</div>
                    <div className={cx('dropDown')} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className={cx('type')}>{selectedSort}</div>
                        {isDropdownOpen ? (
                            <IoIosArrowUp style={{ width: '18px', height: '18px' }} />
                        ) : (
                            <IoIosArrowDown style={{ width: '18px', height: '18px' }} />
                        )}
                        {isDropdownOpen && (
                            <div className={cx('dropdown_menu')}>
                                <div onClick={() => handleSortSelect('Ngẫu nhiên')}>Ngẫu nhiên</div>
                                <div onClick={() => handleSortSelect('Giá thấp đến cao')}>Giá thấp đến cao</div>
                                <div onClick={() => handleSortSelect('Giá cao đến thấp')}>Giá cao đến thấp</div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('list_product')}>
                    {listProduct?.Products?.length > 0 &&
                        listProduct.Products.map((product, index) => (
                            <ProductCard cssText={cx('cssText')} key={index} product={product} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default ProductCategoryPage;
