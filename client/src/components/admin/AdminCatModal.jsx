import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import AddminCategoryForm from './AddminCategoryForm';
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminCatModal = ({ show, onShowModal, onHideModal }) => {

    const dispatch = useDispatch();

    /*======================================*/

    return (
        <div className="my-modal">
            <Modal
                show={show}
                onHide={() => { dispatch(onShowModal()) }}
                className="custom-modal"
            >
                <Modal.Header closeButton onClick={() => { dispatch(onHideModal()) }}>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddminCategoryForm />
                </Modal.Body>
            </Modal>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default AdminCatModal;