import "./singlePost.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa6";
import { LiaEdit, LiaHeartSolid } from "react-icons/lia";
import { BsFillPersonFill } from "react-icons/bs";
import { HiAnnotation } from 'react-icons/hi';
import imgSrc from "../../../utils/constants";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const SinglePost = ({ post, userInLocalStorage, profileUsername, profileId, onPostDelete }) => {

    // if there is a logged user go to it profile,otherwise go to the user that create the post
    const profileLink = profileId ? `/profile/${profileId}` : `/profile/${post?.user?._id}`;

    return (
        <div className="single-post">
            <div className="top">
                {post?.postImage && <img src={post?.postImage?.url} alt="post" />}
            </div>
            <div className="bottom">
                <h5 className="text-capitalize mb-0">
                    {post?.title && post?.title.length > 42 ? post?.title.slice(0, 42) + "..." : post?.title}
                </h5>
                <div className="bottom-body">
                    <div className="author d-flex align-items-center justify-content-between mt-2">
                        <h5 className="mb-0">
                            <Link to={profileLink}>
                                <BsFillPersonFill />{profileUsername ? profileUsername : post?.user?.username}
                            </Link>
                        </h5>
                        <span>{new Date(post?.createdAt).toDateString()}</span>
                    </div>
                    <div className="text-start some-info">
                        <Link to={`/post/category/${post?.category}`}>{post?.category}</Link>
                        <div className="d-flex gap-2">
                            <span><HiAnnotation />{post?.comments?.length} comments</span>
                            <span><LiaHeartSolid />{post?.likes?.length} likes</span>
                        </div>
                    </div>
                    {
                        /*
                         - first should be an user logged in
                         - if the id of user in localstorage  === the id of user that make the post, show the [edit delete btn] in post
                        */
                        post?.user?._id === userInLocalStorage?._id
                        &&
                        <div>
                            <Link
                                className="text-primary"
                                title="Edit Post"
                                to={`/post-edit/${post?._id}`}
                            ><LiaEdit /></Link>
                            <span
                                className="text-danger"
                                title="Delete Post"
                                onClick={() => onPostDelete(post?._id)}
                            ><FaTrash /></span>
                        </div>
                    }
                </div>
                <Link to={`/post-details/${post?._id}`} className="read-more">Read Article</Link>
            </div>
        </div>
    )
}

export default SinglePost;