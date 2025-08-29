import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { setHideNewCatModal, setShowNewCatModal } from "../../redux/slices/categorySlice";
import AdminCatModal from "./AdminCatModal";
import { FaTrash } from "react-icons/fa6";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminCategories = () => {

    const dispatch = useDispatch();

    const { categories, showNewCatModal } = useSelector((state) => state.category);


    useEffect(() => {
        dispatch(fetchCategories());
    }, [categories]);


    // delete category from table depend on it id
    const Delete = async (id) => {
        dispatch(deleteCategory(id));
    };

    /*===========================================*/

    // show confirm msg,when need to delete some category
    const handleDeleteCategory = async (id) => {
        const singleCategorie = categories.find(el => el._id === id);
        const txt = <>Are you sure you want to delete <span className='text-danger text-nowrap'>{`[${singleCategorie.title}]`}</span> ?</>
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

    /*===========================================*/

    return (
        <div className='table-box'>
            <div className="headTitle d-flex align-items-center justify-content-between mb-3">
                <h1 className="h2 text-capitalize text-dark">all categories</h1>
                <button
                    className='btn btn-success rounded-1'
                    onClick={() => { dispatch(setShowNewCatModal()) }}
                >Add New</button>
            </div>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>Category</th>
                        <th scope="col" className='text-center'>Create At</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.length > 0
                        ? categories?.map((el, idx) => (
                            <tr key={idx}>
                                <th scope="row" className='text-center'>{idx + 1}</th>
                                <td className='text-center text-capitalize'>{el.title}</td>
                                <td className='text-center'>{new Date(el.createdAt).toDateString()}</td>
                                <td className='d-flex justify-content-center gap-1'>
                                    <button
                                        className='btn btn-small bg-danger rounded-0 text-white'
                                        onClick={() => handleDeleteCategory(el._id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <>
                            <tr className='text-center'>
                                <td colSpan="4"><h5>No Category Yet,Add One !</h5></td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
            {/* [add new] category modal */}
            <AdminCatModal
                show={showNewCatModal}
                onShowModal={setShowNewCatModal}
                onHideModal={setHideNewCatModal}
            />
        </div>
    )
}

export default AdminCategories;