import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";
import { BsHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import imgSrc from "../../utils/constants";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AddComment = ({ user, post, onLike }) => {

    const dispatch = useDispatch();

    const { commentLoading } = useSelector((state) => state.comment);

    const postId = post?._id;

    const [text, setText] = useState("");

    /*===========================================*/

    // add comment handler
    const addCommentHandler = (e) => {
        e.preventDefault();
        if (text.length > 200) {
            return;
        }
        dispatch(createComment({ text, postId }));
        setText("");
    }

    /*===========================================*/

    return (
        <>
            <small className="d-flex gap-2 fs-6" style={{ color: "var(--dark)" }}>
                <span style={{ fontSize: "20px", cursor: "pointer" }}>
                    {
                        // if the user id already exist in [post.likes arry] that mean the user is [already like the post] ,otherwise no
                        post?.likes?.includes(user?._id)
                            ?
                            <>
                                <BsHandThumbsUpFill
                                    className="align-text-top"
                                    onClick={() => dispatch(onLike(post?._id))}
                                />
                            </>
                            :
                            <>
                                <BsHandThumbsUp
                                    className="align-text-top"
                                    onClick={() => dispatch(onLike(post?._id))}
                                />
                            </>

                    }
                </span>{post?.likes?.length} likes
            </small>
            <form className="my-3" style={{ width: "480px" }} onSubmit={addCommentHandler}>
                <p style={{ fontSize: "13px", color: "var(--dark)" }}>Signed in as:
                    <img
                        src={user?.userImage?.url}
                        width="25"
                        height="25"
                        alt="user image"
                        className="rounded-circle mx-1"
                    />
                    <Link
                        to={`/profile/${user?._id}`}
                        className="text-capitalize ms-1"
                    >
                        {user?.username}
                    </Link>
                </p>
                <div className="form-group">
                    <textarea
                        cols="60"
                        rows="5"
                        placeholder="Add a comment"
                        className="mytextarea p-2 border border-2 rounded"
                        maxLength='200'
                        style={{ width: "100%", backgroundColor: "transparent", color: "var(--dark)" }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                    <button type="submit" className="btn btn-small bg-dark text-white rounded-pill px-3 py-1" style={{ width: "110px" }}>
                        {
                            commentLoading
                                ?
                                <>
                                    <div
                                        className="spinner-border"
                                        style={{ width: "15px", height: "15px", margin: "2px 0", borderWidth: "1px", color: "#fff" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </>
                                :
                                "Comment"
                        }
                    </button>
                    <p className="mb-0" style={{ fontSize: "11px", color: "var(--light-white)" }}>{200 - text.length} characters remaining</p>
                </div>
            </form>
        </>
    )
}

export default AddComment;