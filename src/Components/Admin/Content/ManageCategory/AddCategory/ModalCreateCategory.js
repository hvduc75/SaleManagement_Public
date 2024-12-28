import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import { postCreateNewCategory } from '../../../../../service/categoryApiService';
import styles from './ModalCreateCategory.module.scss';

const cx = classNames.bind(styles);

function ModalCreateCategory(props) {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setHot('0');
        setImage('');
        setPreviewImage('');
    };

    const [name, setName] = useState('');
    const [hot, setHot] = useState('0');
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

    const handleSubmitCreateCategory = async () => {
        let data = await postCreateNewCategory(name, hot, description, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListCategoriesWithPaginate(1);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className={cx('modal-add-category')}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new category</Modal.Title>
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
                            <label className="form-label">Hot</label>
                            <select
                                className="form-select"
                                value={hot}
                                onChange={(event) => setHot(event.target.value)}
                            >
                                <option value="1">YES</option>
                                <option value="0">NO</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Description</label>
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
                    <Button variant="primary" onClick={() => handleSubmitCreateCategory()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateCategory;
