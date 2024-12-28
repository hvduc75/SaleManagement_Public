import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import _ from 'lodash';

import { putUpdateBanner } from '../../../../../service/bannerApiService';
import styles from './ModalUpdateBanner.module.scss';

const cx = classNames.bind(styles);

function ModalUpdateBanner(props) {
    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setStatus('0');
        setImage('');
        setPreviewImage('');
        props.resetUpdateData();
    };

    const [name, setName] = useState('');
    const [status, setStatus] = useState('0');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
        }
    };

    useEffect(() => {
        console.log(dataUpdate)
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setStatus(dataUpdate.status ? '1': '0');
            if (dataUpdate.image) {
                const byteArray = new Uint8Array(dataUpdate.image.data);
                let binary = '';
                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                const base64String = window.btoa(binary);
                setPreviewImage(`data:image/jpeg;base64,${base64String}`);
            }
        }
    }, [dataUpdate]);

    const handleSubmitUpdateBanner = async () => {
        let data = await putUpdateBanner(dataUpdate.id, name, status, description, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListBannersWithPaginate(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className={cx('modal-update-banner')}>
                <Modal.Header closeButton>
                    <Modal.Title>Update banner</Modal.Title>
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
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="1">ON</option>
                                <option value="0">OFF</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">description</label>
                            <textarea
                                class="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className={cx('form-label', 'label-upload')} htmlFor="labelUpload">
                                <div className={cx('btn-upload')}>
                                    <FcPlus className={cx('icon_plus')} />
                                    <span>Upload File Image</span>
                                </div>
                            </label>
                            <input type="file" hidden id="labelUpload" onChange={(event) => handleUploadImage(event)} />
                        </div>
                        <div className={cx('col-md-12', 'img-preview')}>
                            {previewImage ? <img src={previewImage} alt="PrevImage" /> : <span>Preview Image</span>}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitUpdateBanner()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateBanner;
