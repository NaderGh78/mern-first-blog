import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleLikePost } from "../../../redux/apiCalls/postApiCall";
import { deleteComment } from "../../../redux/apiCalls/commentApiCall";
import SingleComment from "../../../components/comments/SingleComment";
import AddComment from "../../../components/comments/AddComment";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Comments = ({ user, post }) => {

    const dispatch = useDispatch();

    const [showEditComment, setShowEditComment] = useState();

    /*===========================================*/

    //delete comment depend on it id
    const Delete = async (commentId) => {
        dispatch(deleteComment(commentId));
    };

    /*===========================================*/

    // show confirm msg,when need to delete comment
    const handleDeleteComment = async (commentId) => {
        confirmAlert({
            message: "Are you sure you want to delete this comment?",
            buttons: [{
                label: 'Yes',
                onClick: () => Delete(commentId)
            },
            { label: 'No' }
            ]
        });
    }

    /*===========================================*/

    return (
        <div className="comments">
            <div className="comments-content">
                {/* 
                if there is no logged user,show [You must be logged in to comment],
                otherwise ,show add comment comp,in order the logged user allow to [comment ,like] on the post 
                */}
                {!user
                    ?
                    <>
                        <small className="d-flex gap-2 fs-6" style={{ color: "var(--light-white)" }}>{post?.likes.length} likes</small>
                        <p className="text-secondary">You must be logged in to comment. <Link to="/login">Login</Link></p>
                    </>
                    :
                    <>
                        <AddComment
                            user={user}
                            post={post}
                            onLike={toggleLikePost}
                        />
                    </>
                }
                <div className="user-comments-box">
                    <h6 className="mb-4" style={{ color: "var(--light-white)" }}>
                        Comments
                        <span className="comments-leng">{post?.comments?.length}</span>
                    </h6>
                    <div className="all-user-comments">
                        {/* map all the users comments on post,and sort them from [newset to oldest] */}
                        {
                            post?.comments?.map(el => (
                                <SingleComment
                                    key={el._id}
                                    user={user}
                                    commentDetails={el}
                                    setShowEditComment={setShowEditComment}
                                    onDelete={handleDeleteComment}
                                    expandForm={() => setShowEditComment(el._id)}
                                    isFormShow={showEditComment === el._id}
                                />
                            )).reverse()
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments;