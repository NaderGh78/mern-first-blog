import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCustomer, getAllCustomers, getSingleCustomer } from '../../redux/apiCalls/customerApiCall';
import {
    setShowSingleCutomerModal,
    setHideSingleCustomerModal,
    setShowAddNewCutomerModal,
    setHideAddNewCustomerModal,
    setShowUpdateCutomerModal,
    setHideUpdateCustomerModal
} from '../../redux/slices/customerSlice';
import AdminSingleCustomerModal from './AdminSingleCustomerModal';
import AdminUpdateCustomerModal from './AdminUpdateCustomerModal';
import AdminNewCustomerModal from './AdminNewCustomerModal';
import { FaTrash } from "react-icons/fa6";
import { LiaEdit, LiaEye } from "react-icons/lia";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css  

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminCustomersTable = () => {

    const {
        customer,
        customers,
        showSingleCustomerModal,
        showAddNewCustomerModal,
        showUpdateCustomerModal } = useSelector((state) => state.customer);

    const dispatch = useDispatch();

    /*===========================================*/

    // get all customers in order to draw the ui,depend on [customers] when changed
    useEffect(() => {
        dispatch(getAllCustomers());
    }, [customers]);

    /*===========================================*/

    // get the single customer by id when click on btn ,and open [single customer] modal
    const openSingleCustomerModal = (id) => {
        dispatch(getSingleCustomer(id));
        dispatch(setShowSingleCutomerModal());
    }

    /*===========================================*/

    // get the single customer by id when click on btn ,and open [update customer] modal
    const openUpdateCustomerModal = (id) => {
        dispatch(getSingleCustomer(id));
        dispatch(setShowUpdateCutomerModal());
    }

    /*===========================================*/

    // delete customer from table depend on it id
    const Delete = async (id) => {
        dispatch(deleteCustomer(id));
    };

    /*===========================================*/

    // show confirm msg,when need to delete some customer
    const handleDelete = async (id) => {
        const singleCustomer = customers.find(el => el._id === id);
        const txt = <>Are you sure you want to delete <span className='text-danger text-nowrap'>{`[${singleCustomer.name}]`}</span> ?</>
        confirmAlert({
            message: txt,
            buttons: [{
                label: 'Yes',
                onClick: () => Delete(id)
            },
            { label: 'No' }
            ]
        });
    }

    /*=========================================*/

    return (
        <div className='table-box'>
            <div className="headTitle d-flex align-items-center justify-content-between">
                <h1>All Customers</h1>
                <button
                    className='btn btn-success rounded-1'
                    onClick={() => { dispatch(setShowAddNewCutomerModal()) }}
                >Add New</button>
            </div>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>Name</th>
                        <th scope="col" className='text-center'>Email</th>
                        <th scope="col" className='text-center'>Create At</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length > 0
                        ? customers?.map((el, idx) => (
                            <tr key={idx}>
                                <th scope="row" className='text-center'>{idx + 1}</th>
                                <td className='text-center text-capitalize'>{el.name}</td>
                                <td className='text-center'>{el.email}</td>
                                <td className='text-center'>{new Date(el.createdAt).toDateString()}</td>
                                <td className='d-flex justify-content-center gap-1'>
                                    <button
                                        className='btn btn-small bg-success rounded-0 text-white'
                                        onClick={() => openSingleCustomerModal(el._id)}
                                    >
                                        <LiaEye />
                                    </button>
                                    <button
                                        className='btn btn-small bg-primary rounded-0 text-white'
                                        onClick={() => openUpdateCustomerModal(el._id)}
                                    >
                                        <LiaEdit />
                                    </button>
                                    <button
                                        className='btn btn-small bg-danger rounded-0 text-white'
                                        onClick={() => handleDelete(el._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <>
                            <tr className='text-center'>
                                <td colSpan="5"><h2>No Data Yet!</h2></td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
            {/* [add new] customer modal */}
            <AdminNewCustomerModal
                showAddNewCustomerModal={showAddNewCustomerModal}
                setShowAddNewCutomerModal={setShowAddNewCutomerModal}
                setHideAddNewCustomerModal={setHideAddNewCustomerModal}
            />

            {/* [show single] customer modal */}
            <AdminSingleCustomerModal
                showSingleCustomerModal={showSingleCustomerModal}
                setShowSingleCutomerModal={setShowSingleCutomerModal}
                setHideSingleCustomerModal={setHideSingleCustomerModal}
                customer={customer}
            />

            {/* [show update] customer modal */}
            <AdminUpdateCustomerModal
                showUpdateCustomerModal={showUpdateCustomerModal}
                setShowUpdateCutomerModal={setShowUpdateCutomerModal}
                setHideUpdateCustomerModal={setHideUpdateCustomerModal}
                customer={customer}
            />
        </div>
    )
}

export default AdminCustomersTable;