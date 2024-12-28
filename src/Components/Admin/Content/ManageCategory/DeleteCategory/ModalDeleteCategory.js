import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteCategory } from '../../../../../service/categoryApiService';

function ModalDeleteCategory(props) {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDeleteCategory = async () => {
        let data = await deleteCategory(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchListCategoriesWithPaginate(props.currentPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete The Category?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this category. name ={' '}
                    <b>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSubmitDeleteCategory();
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteCategory;
