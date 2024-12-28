import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import _ from 'lodash';

import { putUpdateProduct } from '../../../../../service/productApiService';
import styles from './ModalUpdateProduct.module.scss';

const cx = classNames.bind(styles);

function ModalUpdateProduct(props) {
    const { show, setShow, dataUpdate, selectedCategory } = props;
    const handleClose = () => {
        setShow(false);
        setName('')
        setPrice('')
        setSale('')
        setQuantity('')
        setBackground('')
        setBackground('')
        setPreviewBackground('')
        setPreviewImage('')
        props.resetUpdateData();
    };

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [sale, setSale] = useState('');
    const [quantity, setQuantity] = useState('');
    const [background, setBackground] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [previewBackground, setPreviewBackground] = useState('');

    const handleUploadImage = (event, name) => {
        if (event.target && event.target.files && event.target.files[0] && name === 'image') {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
        if (event.target && event.target.files && event.target.files[0] && name === 'background') {
            setPreviewBackground(URL.createObjectURL(event.target.files[0]));
            setBackground(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setPrice(dataUpdate.price)
            setSale(dataUpdate.sale)
            setQuantity(dataUpdate.quantity_current)
            if (dataUpdate.image) {
                const byteArray = new Uint8Array(dataUpdate.image.data);
                let binary = '';
                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                const base64String = window.btoa(binary);
                setPreviewImage(`data:image/jpeg;base64,${base64String}`);
            }
            if (dataUpdate.background) {
                const byteArray = new Uint8Array(dataUpdate.background.data);
                let binary = '';
                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                const base64String = window.btoa(binary);
                setPreviewBackground(`data:image/jpeg;base64,${base64String}`);
            }
        }
    }, [dataUpdate]);

    const handleSubmitUpdateProduct = async () => {
        let data = await putUpdateProduct(dataUpdate.id, name, price, sale, quantity, image, background, +selectedCategory.value);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetListProductsWithPaginate(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className={cx('modal-update-product')}>
                <Modal.Header closeButton>
                    <Modal.Title>Update product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Price</label>
                            <input
                                type="text"
                                className="form-control"
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Sale</label>
                            <input
                                type="text"
                                className="form-control"
                                value={sale}
                                onChange={(event) => setSale(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Quantity</label>
                            <input
                                type="text"
                                className="form-control"
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className={cx('form-label', 'label-upload')} htmlFor="labelUploadBackground">
                                <div className={cx('btn-upload')}>
                                    <FcPlus className={cx('icon_plus')} />
                                    <span>Upload File Background</span>
                                </div>
                            </label>
                            <input
                                type="file"
                                hidden
                                id="labelUploadBackground"
                                onChange={(event) => handleUploadImage(event, 'background')}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className={cx('form-label', 'label-upload')} htmlFor="labelUploadImage">
                                <div className={cx('btn-upload')}>
                                    <FcPlus className={cx('icon_plus')} />
                                    <span>Upload File Image</span>
                                </div>
                            </label>
                            <input
                                type="file"
                                hidden
                                id="labelUploadImage"
                                onChange={(event) => handleUploadImage(event, 'image')}
                            />
                        </div>
                        <div className={cx('col-md-6', 'img-preview')}>
                            {previewBackground ? <img src={previewBackground} alt="PrevImageBackground" /> : <span>Preview Background</span>}
                        </div>
                        <div className={cx('col-md-6', 'img-preview')}>
                            {previewImage ? <img src={previewImage} alt="PrevImage" /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateProduct()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateProduct;
