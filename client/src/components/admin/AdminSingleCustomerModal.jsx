import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminSingleCustomerModal = ({
    showSingleCustomerModal,
    setShowSingleCutomerModal,
    setHideSingleCustomerModal,
    customer }) => {

    const dispatch = useDispatch();

    /*===========================================*/

    return (
        <div className="my-modal">
            <Modal
                show={showSingleCustomerModal}
                onHide={() => { dispatch(setShowSingleCutomerModal()) }}
                className="custom-modal"
            >
                <Modal.Header closeButton onClick={() => { dispatch(setHideSingleCustomerModal()) }}>
                    <Modal.Title>Show Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="view-user text-center">
                        <h5 className="text-capitalize">{customer?.name}</h5>
                        <p className="card-text mb-0">
                            {customer?.email}
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default AdminSingleCustomerModal;