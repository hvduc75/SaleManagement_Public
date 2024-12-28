import React from 'react';
import classNames from 'classnames/bind';
import styles from './Homepage.module.scss';
import SideBar from '../../User/SideBar/SideBar';
import Content from '../../User/Content/Content';

const cx = classNames.bind(styles);

function Homepage(props) {
    return (
        <div className={cx('wrapper')}>
            <SideBar />
            <Content />
        </div>
    );
}

export default Homepage;
