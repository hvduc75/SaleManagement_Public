import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { toast } from 'react-toastify';

import styles from './AddProductDetail.module.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { getAllProducts } from '../../../../service/productApiService';
import { postCreateProductDetail, getProductDetail } from '../../../../service/productDetailApiService';

const mdParser = new MarkdownIt();
const cx = classNames.bind(styles);

function AddProductDetail(props) {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [listProducts, setListProducts] = useState([]);
    const [description, setDescription] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [hasOldData, setHasOldData] = useState(false);
    const [action, setAction] = useState("Create")

    useEffect(() => {
        fetchListProducts();
    }, []);

    useEffect(() => {
        fetchProductDetailByProductId();
    }, [selectedProduct]);

    const fetchListProducts = async () => {
        let products = await getAllProducts();
        if (products && products.EC === 0) {
            let listProducts = products.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListProducts(listProducts);
        }
    };

    const fetchProductDetailByProductId = async () => {
        let data = await getProductDetail(+selectedProduct.value);
        if (data.EC !== 0) {
            toast.error(data.EM);
        } else {
            if (data.DT) {
                setContentMarkdown(data.DT.contentMarkdown);
                setHasOldData(true);
                setAction("Edit");
            } else {
                setContentMarkdown('');
                setHasOldData(false);
                setAction("Create");
            }
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setDescription(html);
        setContentMarkdown(text);
    };

    const handleProductDetail = async () => {
        let data = await postCreateProductDetail(description, contentMarkdown, +selectedProduct.value, action);
        if (data.EC === 0) {
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('list_products')}>
                    <Select defaultValue={selectedProduct} onChange={setSelectedProduct} options={listProducts} />
                </div>
                <div className={cx('product_images')}>
                    Phần này xử lý cho phép lưu nhiều ảnh của sản phẩm trong phần chi tiết sản phẩm
                </div>
            </div>
            <MdEditor
                value={contentMarkdown} 
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <button onClick={() => handleProductDetail()} className={hasOldData ? cx('btn-save', 'btn', 'btn-warning') : cx('btn-save', 'btn', 'btn-success')}>
                {hasOldData ? "Save" : "Add"}
            </button>
        </div>
    );
}

export default AddProductDetail;
