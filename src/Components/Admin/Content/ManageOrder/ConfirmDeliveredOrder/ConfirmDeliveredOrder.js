import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { confirmDeliveredOrder } from '../../../../../service/orderApiService';
import { toast } from 'react-toastify';

function ConfirmDeliveredOrder(props) {
    const { show, setShow, orderId, fetchListOrders, activeTab } = props;
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleClose = () => {
        setShow(false);
        setImage(null);
        setPreviewImage('');
    };

    const handleConfirm = async () => {
        console.log(orderId, image)
        let data = await confirmDeliveredOrder(orderId, image);
        if (data.EC === 0) {
            toast.success('Xác nhận giao hàng thành công');
            fetchListOrders(1, activeTab);
            setShow(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận giao hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" onChange={handleUploadImage} className="form-control" />
                <div
                    style={{
                        maxWidth: '200px',
                        margin: '10px 0',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, .075)',
                    }}
                >
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '5px',
                                marginTop: '10px',
                            }}
                        />
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={() => handleConfirm()}>
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeliveredOrder;
