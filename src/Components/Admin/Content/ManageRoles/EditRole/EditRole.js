import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { updateRole } from '../../../../../service/roleApiService';

function ModalUpdateRole(props) {
    const { show, setShow, dataUpdate } = props;
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => {
        setShow(false);
        setUrl('');
        setDescription('');
        props.resetDataUpdate();
    };

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setUrl(dataUpdate.url);
            setDescription(dataUpdate.description);
        }
    }, [dataUpdate]);

    const handleUpdateRole = async () => {
        let data = await updateRole(dataUpdate.id, url, description);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.getAllRoles();
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Update Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Url</label>
                            <input
                                type="text"
                                className="form-control"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateRole()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateRole;
