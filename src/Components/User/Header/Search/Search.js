import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSearch = () => {
        if (searchText.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchText)}`);
        }
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('q');
        if (query) {
            setSearchText(query);
        }
    }, [location.search]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('search')}>
                <div className={cx('search-icon')}>
                    <IoMdSearch style={{ width: '20px', height: '20px' }} />
                </div>
                <input
                    className={cx('search-input')}
                    placeholder="Freeship đơn từ 45k"
                    value={searchText}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    onChange={(event) => setSearchText(event.target.value)}
                />
                <div onClick={handleSearch} className={cx('btn-search')}>
                    Tìm Kiếm
                </div>
            </div>
        </div>
    );
}

export default Search;
