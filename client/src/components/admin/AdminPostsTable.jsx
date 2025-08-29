import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPostsForAdmin } from "../../redux/apiCalls/postApiCall";
import { getAllUsersProfile } from "../../redux/apiCalls/profileApiCall";
import { FaTrash } from "react-icons/fa6";
import { LiaEye } from "react-icons/lia";
import imgSrc from "../../utils/constants";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminPostsTable = () => {

    const dispatch = useDispatch();

    const { posts } = useSelector((state) => state.post);

    /*===========================================*/

    useEffect(() => {
        dispatch(getAllPostsForAdmin());
    }, [posts]);

    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, []);

    /*===========================================*/

    //delete post depend on it id
    const Delete = async (id) => {
        dispatch(deletePost(id));
    };

    /*===========================================*/

    // show confirm msg,when need to delete some post
    const handleDelete = async (id) => {
        confirmAlert({
            message: "Are you sure you want to delete this post?",
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
        <div className='table-box mb-5'>
            <h2>All Posts</h2>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>User</th>
                        <th scope="col" className='text-center'>Title</th>
                        <th scope="col" className='text-center'>Post Image</th>
                        <th scope="col" className='text-center'>Category</th>
                        <th scope="col" className='text-center text-nowrap'>Create At</th>
                        <th scope="col" className='text-center'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.length > 0
                        ? posts?.map((el, idx) => (
                            <tr key={idx}>
                                <th scope="row" className='text-center'>{idx + 1}</th>
                                <td className='text-capitalize bg-danger text-center'>
                                    {el.user.userImage &&
                                        <img
                                            src={el.user?.userImage?.url}
                                            alt="avatar"
                                            className="d-block mx-auto"
                                            style={{ width: "33px", height: "33px" }}
                                        />}
                                    <span
                                        className="ms-2 text-nowrap"
                                        style={{ color: el.user.isAdmin && "red" }}
                                    >{el.user.username}</span>
                                </td>
                                <td className='text-center'>{el.title}</td>
                                <td className='text-center'>
                                    <img
                                        src={el.postImage?.url}
                                        alt="post"
                                        className="d-block mx-auto"
                                        style={{ width: "100px", height: "60px", borderRadius: "0" }}
                                    />
                                </td>
                                <td className='text-center'>{el.category}</td>
                                <td className='text-center text-nowrap'>{new Date(el.createdAt).toDateString()}</td>
                                <td className='text-center text-nowrap'>
                                    <Link
                                        to={`/post-details/${el._id}`}
                                        className='btn btn-small bg-success rounded-0 text-white me-1'
                                    >
                                        <LiaEye />
                                    </Link>

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
                                <td colSpan="7"><h2>No Post Yet!</h2></td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminPostsTable;