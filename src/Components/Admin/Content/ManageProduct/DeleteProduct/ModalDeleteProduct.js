import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteProduct } from '../../../../../service/productApiService';

function ModalDeleteProduct(props) {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => {
        setShow(false);
    };

    const handleSubmitDeleteProduct = async () => {
        let data = await deleteProduct(dataDelete.id);
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
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete The Product?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to delete this Product. name ={' '}
                    <b>{dataDelete && dataDelete.name ? dataDelete.name : ''}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleSubmitDeleteProduct();
                        }}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteProduct;
