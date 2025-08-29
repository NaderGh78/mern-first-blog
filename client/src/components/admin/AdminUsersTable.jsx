import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";
import { FaTrash } from "react-icons/fa6";
import { LiaEye } from "react-icons/lia";
import imgSrc from "../../utils/constants";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminUsersTable = () => {

    const dispatch = useDispatch();

    const { profiles } = useSelector((state) => state.profile);

    /*===========================================*/

    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, [profiles]);

    // delete user from table depend on it id
    const Delete = async (id) => {
        dispatch(deleteProfile(id));
    };

    /*===========================================*/

    // show confirm msg,when need to delete some user
    const handleDelete = async (id) => {
        const singleUser = profiles.find(el => el._id === id);
        const txt = <>Are you sure you want to delete <span className='text-danger text-nowrap'>{`[${singleUser.username}]`}</span> ?</>
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
            <h2>All Users</h2>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>Name</th>
                        <th scope="col" className='text-center'>Email</th>
                        <th scope="col" className='text-center'>Photo</th>
                        <th scope="col" className='text-center'>Create At</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        profiles.length > 0
                            ?
                            profiles.map((el, i) => (
                                <tr key={el._id}>
                                    <th scope="row" className='text-center'>{i + 1}</th>
                                    <td
                                        className='text-center text-capitalize'
                                        style={{ color: el.isAdmin && "red" }}
                                    >{el.isAdmin ? el.username + " [Admin]" : el.username}</td>
                                    <td className='text-center'>
                                        <a href={`mailto:${el.email}`} target="_blank">{el.email}</a>
                                    </td>
                                    <td className='text-center'>
                                        <img src={el.userImage?.url} alt="avatar" />
                                    </td>
                                    <td className='text-center'>{new Date(el.createdAt).toDateString()}</td>
                                    <td className='text-center text-nowrap'>
                                        <Link
                                            to={`/profile/${el._id}`}
                                            className='btn btn-small bg-success rounded-0 text-white me-1'
                                        >
                                            <LiaEye />
                                        </Link>

                                        {/* if the user is admin , hide the delete btn */}
                                        {!el.isAdmin
                                            &&
                                            <>
                                                <button
                                                    className='btn btn-small bg-danger rounded-0 text-white'
                                                    onClick={() => handleDelete(el._id)}
                                                    disabled={el.isAdmin}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            ))
                            :
                            <tr className='text-center'>
                                <td colSpan="6"><h2>No Users Yet!</h2></td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminUsersTable;