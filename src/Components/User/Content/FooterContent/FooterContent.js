import React from 'react';
import classNames from 'classnames/bind';

import styles from './FooterContent.module.scss';

const cx = classNames.bind(styles);

function FooterContent(props) {
    return (
        <div className={cx('Wrapper')}>
            <h1>Đây là 1 project tự clone lại sàn thương mại điện tử là tiki</h1>
            <h2>
                Mặc dù nói là clone lại nhưng sẽ có những thứ rất khoai không làm nổi và nó cũng chỉ là giao diện. 
                Thực tế nó chỉ là 1 shop bán hàng bình thường chứ không cho phép người dùng đăng sản phẩm như 1 sàn
                thương mại điện tử.
            </h2>
            <span>Một số thông tin về project này:</span>
            <p>Nó là 1 dự án FullStack với Backend là Nodejs và Frontend là Reactjs</p>
            <p>Nó được tạo vào ngày <span>2/10/2024</span> sau khi thi kết thúc blog I</p>
        </div>
    );
}

export default FooterContent;
