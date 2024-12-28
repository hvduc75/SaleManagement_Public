import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from 'react-icons/fc';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import { postCreateNewUser } from '../../../../../service/userApiService';
import styles from './ModalCreateUser.module.scss';

const cx = classNames.bind(styles);

function ModalCreateUser(props) {
    const { show, setShow } = props;
    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setImage('');
        setPreviewImage('');
        setPhone('');
        setAddress('');
        setGroupId('1');
        setUsername('');
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [groupId, setGroupId] = useState('1');
    const [image, setImage] = useState('');
    const [previewImage, setPreviewImage] = useState('');

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        } else {
        }
    };

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            );
    };

    const validatePhone = (phone) => {
        return /^0\d{9}$/.test(phone);
    };    

    const handleSubmitCreateUser = async () => {
        // validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Email không hợp lệ!');
            return;
        }

        if (!password) {
            toast.error('Mật khẩu không thể để trống!');
            return;
        }

        if (!validatePhone(phone)) {
            toast.error('Số điện thoại phải bắt đầu với 0 và có 10 số');
            return;
        }

        let data = await postCreateNewUser(email, password, username, phone, address, groupId, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            //   await props.fetchListUsers();
            props.setCurrentPage(1);
            await props.fetchListUsersWithPaginate(1);
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
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;
