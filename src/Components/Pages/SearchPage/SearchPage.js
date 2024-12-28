import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, Link } from 'react-router-dom';

import styles from './SearchPage.module.scss';
import { IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import ProductCard from '../../User/Content/ProductCard/ProductCard';

import { getAllProductsWithSearchText } from '../../../service/productApiService';

const cx = classNames.bind(styles);

function SearchPage() {
    const location = useLocation();
    const [listProduct, setListProduct] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('Ngẫu nhiên');
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        fetListProducts();
    }, [query]);

    const fetListProducts = async () => {
        let products = await getAllProductsWithSearchText(query);
        if (products.EC === 0) {
            setListProduct(products.DT);
            setFilteredProducts(products.DT); // Set filteredProducts to initial list
        }
    };

    const handleSortSelect = (sortType) => {
        setSelectedSort(sortType);
        setIsDropdownOpen(false);

        let sortedProducts = [...listProduct]; // Make a copy of the listProduct array

        switch (sortType) {
            case 'Giá thấp đến cao':
                sortedProducts.sort((a, b) => (a.price_current || a.price) - (b.price_current || b.price));
                break;
            case 'Giá cao đến thấp':
                sortedProducts.sort((a, b) => (b.price_current || b.price) - (a.price_current || a.price));
                break;
            default:
                sortedProducts = [...listProduct]; // Reset to original list if "Ngẫu nhiên" is selected
                break;
        }

        setFilteredProducts(sortedProducts); // Update filteredProducts
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_category_top')}>
                <Link to={'/'} className={cx('path_home')}>
                    Trang chủ
                </Link>
                <IoIosArrowForward className={cx('icon')} />
                <div className={cx('current_path')}>{`Kết quả tìm kiếm "${query}"`}</div>
            </div>
            <div className={cx('container')}>
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
                    {filteredProducts?.length > 0 &&
                        filteredProducts.map((product, index) => (
                            <ProductCard cssText={cx('cssText', 'cssPrice')} key={index} product={product} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
