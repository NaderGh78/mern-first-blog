import { Link } from "react-router-dom";
import EditCommentForm from "./EditCommentForm";
import { FaThumbsUp } from "react-icons/fa";
import moment from 'moment';
import imgSrc from "../../utils/constants";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SingleComment = ({
    user,
    commentDetails,
    setShowEditComment,
    onDelete,
    expandForm,
    isFormShow
}) => {

    return (
        <div className="single-comment border-bottom border-1 py-2 px-3 mb-2">
            <div className="top d-flex mb-1 gap-2">
                <Link to={`/profile/${commentDetails?.user?._id}`}>
                    <img
                        src={commentDetails?.user?.userImage?.url}
                        width="45"
                        height="45"
                        alt="user image"
                        className="rounded-circle"
                    />
                </Link>
                <div className="w-100">
                    <h6>
                        <Link
                            to={`/profile/${commentDetails?.user?._id}`}
                            className="text-decoration-none text-dark"
                        >
                            {commentDetails?.user?.username}
                        </Link>
                        <span>{moment(commentDetails?.createdAt).fromNow()}</span>
                    </h6>
                    {
                        !isFormShow
                            ?
                            <>
                                <p
                                    className="my-2 lh-base"
                                    style={{ fontSize: "13px", color: "var(--light-white)" }}
                                >{commentDetails?.text} </p>
                                <div className="feedback d-flex gap-3">
                                    <button><FaThumbsUp /></button>
                                    {
                                        /*
                                        if the user already logged in or the user is admin,
                                        and has this comment ,show [edit delete] btn
                                        */
                                        (user?._id === commentDetails?.user?._id || user?.isAdmin)
                                        &&
                                        <>
                                            <button
                                                onClick={() => {
                                                    // to open the comment form
                                                    expandForm()
                                                }}
                                            >Edit</button>
                                            <button
                                                onClick={() => onDelete(commentDetails?._id)}
                                            >Delete</button>
                                        </>
                                    }
                                </div>
                            </>
                            :
                            <>
                                <EditCommentForm
                                    commentDetails={commentDetails}
                                    setShowEditComment={setShowEditComment}
                                />
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleComment;