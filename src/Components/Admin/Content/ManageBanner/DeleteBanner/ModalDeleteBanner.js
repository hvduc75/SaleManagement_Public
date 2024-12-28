import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteBanner } from '../../../../../service/bannerApiService';

function ModalDeleteBanner(props) {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDeleteBanner = async () => {
        let data = await deleteBanner(dataDelete.id);
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
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the Banner?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this banner. name ={' '}
                    <b>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSubmitDeleteBanner();
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteBanner;
