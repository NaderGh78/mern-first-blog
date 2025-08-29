import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../redux/apiCalls/customerApiCall";
import Modal from 'react-bootstrap/Modal';
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminUpdateCustomerModal = ({
    showUpdateCustomerModal,
    setShowUpdateCutomerModal,
    setHideUpdateCustomerModal,
    customer }) => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [age, setAge] = useState("");

    /*===========================================*/

    // put the old inputs values when update,depend every time [customer] has changed
    useEffect(() => {
        setName(customer?.name);
        setEmail(customer?.email);
        setAge(customer?.age);

    }, [customer]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedCustomer = { name, age, email }
        dispatch(updateCustomer(customer?._id, updatedCustomer));
    }

    /*===========================================*/

    return (

        <div className="my-modal">
            <Modal
                show={showUpdateCustomerModal}
                onHide={() => { dispatch(setShowUpdateCutomerModal()) }}
                className="custom-modal"
            >
                <Modal.Header closeButton onClick={() => { dispatch(setHideUpdateCustomerModal()) }}>
                    <Modal.Title>Update Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <form className="my-form" onSubmit={handleUpdate}>
                            <div className="form-group">
                                <label htmlFor="updateName" className="text-dark">Name</label>
                                <input
                                    type="text"
                                    className="form-control my-input"
                                    id="updateName"
                                    placeholder="Update Customer Name"
                                    autoComplete="off"
                                    value={name || ""}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateEmail" className="text-dark">Email</label>
                                <input
                                    type="email"
                                    className="form-control my-input"
                                    id="updateEmail"
                                    placeholder="Update Customer Email"
                                    autoComplete="off"
                                    value={email || ""}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="updateAge" className="text-dark">Age</label>
                                <input
                                    type="number"
                                    className="form-control my-input"
                                    id="updateAge"
                                    placeholder="Update Customer Email"
                                    autoComplete="off"
                                    value={age || ""}
                                    onChange={e => setAge(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-dark rounded-0 w-100"
                            >Update User</button>
                        </form>
                    </>
                </Modal.Body>
            </Modal>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default AdminUpdateCustomerModal; 