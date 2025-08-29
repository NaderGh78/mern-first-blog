import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCustomer } from '../../redux/apiCalls/customerApiCall';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminNewCustomerModal = ({
    showAddNewCustomerModal,
    setShowAddNewCutomerModal,
    setHideAddNewCustomerModal }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [age, setAge] = useState("");

    /*===========================================*/

    const addNewCustomerHandler = async (e) => {
        e.preventDefault();
        dispatch(addNewCustomer({ name, email, age }));
    }

    /*===========================================*/

    return (
        <div className="my-modal">
            <Modal
                show={showAddNewCustomerModal}
                onHide={() => { dispatch(setShowAddNewCutomerModal()) }}
                className="custom-modal"
            >
                <Modal.Header closeButton onClick={() => { dispatch(setHideAddNewCustomerModal()) }}>
                    <Modal.Title>Add New Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="mt-3 my-form" onSubmit={addNewCustomerHandler}>

                        <div className="form-group">
                            <label htmlFor="customerName" className="text-dark">Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                className="form-control my-input"
                                id="customerName"
                                placeholder="Enter Customer Name"
                                autoComplete="off"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="customerEmail" className="text-dark">Email <span className="text-danger">*</span></label>
                            <input
                                type="email"
                                className="form-control my-input"
                                id="customerEmail"
                                placeholder="Enter Customer Email"
                                autoComplete="off"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="customerAge" className="text-dark">Age <span className="text-danger">*</span></label>
                            <input
                                type="number"
                                className="form-control my-input"
                                id="customerAge"
                                placeholder="Enter Customer Age"
                                autoComplete="off"
                                onChange={e => setAge(e.target.value)}
                                value={age}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark rounded-0 w-100 mb-3"
                        >Create New User</button>

                    </form>
                </Modal.Body>
            </Modal>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default AdminNewCustomerModal;