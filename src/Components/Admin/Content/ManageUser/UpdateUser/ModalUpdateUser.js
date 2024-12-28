import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import _ from 'lodash';
import classNames from 'classnames/bind';

import { putUpdateUser } from '../../../../../service/userApiService';
import styles from './ModalUpdateUser.module.scss';

const cx = classNames.bind(styles);

function ModalUpdateUser(props) {
    const { show, setShow, dataUpdate } = props;
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setImage('');
        setPreviewImage('');
        setAddress('');
        setGroupId('1');
        setUsername('');
        props.resetUpdateData();
    };

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [groupId, setGroupId] = useState('1');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setAddress(dataUpdate.address);
            setGroupId(dataUpdate.groupId);
            if (dataUpdate.avatar) {
                const byteArray = new Uint8Array(dataUpdate.avatar.data);
                let binary = '';
                byteArray.forEach((byte) => (binary += String.fromCharCode(byte)));
                const base64String = window.btoa(binary);
                setPreviewImage(`data:image/jpeg;base64,${base64String}`);
            }
        }
    }, [dataUpdate]);

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
        }
    };

    const handleSubmitUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, address, groupId, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListUsersWithPaginate(props.currentPage);
            // props.setCurrentPage(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className={cx('modal-add-user')}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(event) => setAddress(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={groupId}
                                onChange={(event) => setGroupId(event.target.value)}
                            >
                                <option value="1">USER</option>
                                <option value="2">SHIPPER</option>
                                <option value="3">ADMIN</option>
                            </select>
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
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;
