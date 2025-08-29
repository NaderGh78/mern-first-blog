import './postDetails.css';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getSinglePost } from '../../../redux/apiCalls/postApiCall';
import { getAllUsersProfile } from '../../../redux/apiCalls/profileApiCall';
import { fetchAllComments } from '../../../redux/apiCalls/commentApiCall';
import Comments from '../comments/Comments';
import { FaTrash, FaRegClock } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import imgSrc from "../../../utils/constants";
import Spinner from '../../../components/common/spinner/Spinner';
import { ToastContainer } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css  

/*===========================================*/
/*===========================================*/
/*===========================================*/

const PostDetails = () => {

    const dispatch = useDispatch();

    const { post, loading } = useSelector((state) => state.post);

    const { user } = useSelector((state) => state.auth);

    const { isCommentDelete } = useSelector((state) => state.comment);

    const { id } = useParams();

    const navigate = useNavigate();

    /*===========================================*/

    // fetch all comments ,in order to change the comments length in every time [isCommentDelete] changed
    useEffect(() => {
        dispatch(fetchAllComments());
    }, [isCommentDelete]);

    /*===========================================*/

    // get single post by id
    useEffect(() => {
        dispatch(getSinglePost(id));
    }, [id]);

    /*===========================================*/

    // get all users profiles
    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, []);

    /*===========================================*/

    // make a function that will get the post reading time
    function countWords(str) {
        const arr = str?.split(' ');
        const wordCount = arr?.filter(word => word !== '').length;
        const wordsPerMinute = 200;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    /*===========================================*/

    //delete post depend on it id,and navigate to home page
    const Delete = async (id) => {

        const res = await dispatch(deletePost(id));

        if (res?.success) {
            navigate("/", { replace: true });
        }

    };

    /*=========================================*/

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

    /*=========================================*/

    if (loading) return <Spinner />;
    return (
        <>
            <div className="post-details">
                <div className="post-details-content">
                    {post?.postImage &&
                        <img
                            src={post?.postImage?.url}
                            alt="post image"
                            className='post-master-img'
                        />
                    }
                    <h2>{post?.title}</h2>
                    <div className="user-details">
                        <div className="left d-flex align-items-center gap-2">
                            <Link
                                to={`/profile/${post?.user?._id}`}
                            >
                                {post?.user?.userImage &&
                                    <img src={post?.user?.userImage?.url} alt="avatar" />
                                }
                            </Link>

                            <div className="details">
                                <Link
                                    to={`/profile/${post?.user?._id}`}
                                >
                                    {post?.user?.username}
                                </Link>
                                <span className='d-block'>{new Date(post?.createdAt).toDateString()}</span>
                                <span className='d-flex align-items-center gap-1'>
                                    <FaRegClock /> {Number(countWords(post?.description)) + " mins read"}
                                </span>
                            </div>
                        </div>
                        {
                            // if the post belong to logged user , show the [edit and delete] btn
                            user && post?.user?._id === user?._id
                            &&
                            <>
                                <div className="right">
                                    <Link
                                        to={`/post-edit/${post?._id}`}
                                        className="text-success fs-4 me-1"
                                        title="Edit Post"
                                    ><LiaEdit /></Link>
                                    <Link
                                        onClick={() => handleDelete(post?._id)}
                                        className="text-danger"
                                        title="Delete Post"
                                    ><FaTrash /></Link>
                                </div>
                            </>
                        }
                    </div>
                    <p style={{ color: "var(--light-white)" }}>{post?.description}</p>
                    <Comments
                        post={post}
                        user={user}
                    />
                    <ToastContainer autoClose={6000} />
                </div>
            </div>
        </>
    )
}

export default PostDetails;