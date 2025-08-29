import "./userProfile.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { deleteProfile, getUserProfile } from "../../redux/apiCalls/profileApiCall";
import { deletePost, getAllPostsForAdmin } from "../../redux/apiCalls/postApiCall";
import { setShowModal, setHideModal } from "../../redux/slices/profileSlice";
import imgSrc from "../../utils/constants";
import Spinner from "../../components/common/spinner/Spinner";
import { LiaEdit } from "react-icons/lia";
import { FaTrash } from "react-icons/fa6";
import { SinglePost, UpdateUserModal } from "../../allPagesPaths";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

/*===========================================*/
/*===========================================*/
/*===========================================*/

const UserProfile = () => {

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    const { profile, show, loading, isProfileDeleted, isProfileUpdated } = useSelector((state) => state.profile);

    const { posts, isPostDelete } = useSelector((state) => state.post);

    const { id } = useParams();

    const navigate = useNavigate();

    /*===========================================*/

    // get user profile based on id 
    useEffect(() => {
        dispatch(getUserProfile(id));
    }, [id]);
    /*
    put id in order to switch the id of user profile,when the user login want to see the other profile users,
    cos without id will nooooooooooot swith 
    */

    /*===========================================*/
    /*
    get all posts for user based on isPostDelete state , 
    we use isPostDelete in case the user need to remove some of his posts
    */
    useEffect(() => {
        dispatch(getAllPostsForAdmin());
    }, [isPostDelete]);

    /*===========================================*/

    useEffect(() => {
        if (isProfileDeleted) {
            navigate("/", { replace: true });
        }
    }, [navigate, isProfileDeleted]);

    /*===========================================*/

    //delete post depend on it id and logout the user
    const Delete = async (id) => {
        dispatch(deleteProfile(id));
        dispatch(logoutUser());
    };

    /*===========================================*/

    // show confirm msg,when user need to delete his account
    const handleProfileDelete = async (id) => {
        confirmAlert({
            message: "Are you sure you want to delete your account with all your posts and comments ?",
            buttons: [{
                label: 'Yes',
                onClick: () => Delete(id)
            },
            { label: 'No' }
            ]
        });
    }

    /*===========================================*/

    //delete post depend on it id
    const DeletePost = async (id) => {
        dispatch(deletePost(id));
    };

    /*===========================================*/

    // show confirm msg,when need to delete some post
    const handlePostDelete = async (id) => {
        confirmAlert({
            message: "Are you sure you want to delete this post?",
            buttons: [{
                label: 'Yes',
                onClick: () => DeletePost(id)
            },
            { label: 'No' }
            ]
        });
    }

    // get all posts that belongs to user that match id param
    const userPosts = posts?.filter(el => el.user._id === id);

    /*===========================================*/

    if (loading) return <Spinner />;
    return (
        <>
            <div className="user-profile">
                <div className="user-profile-content">
                    <div className="user-profile-img-box text-center">
                        <div className="img-wrapper">
                            <img
                                src={profile?.userImage?.url}
                                alt="user image"
                            />
                        </div>
                        <h3 className="text-capitalize text-white">
                            {/* here just the admin can see who is admin like [Jhone Doe Edit [Admin]] */}
                            {user && user?.isAdmin && profile?.isAdmin ? profile?.username + " [Admin]" : profile?.username}
                        </h3>
                        {profile?.username && <p className="mb-0 h6 text-white text-capitalize">{profile?.bio}</p>}
                        <div className="text-white mt-2">
                            Date Joined : <span className="text-warning h6">{new Date(profile?.createdAt).toDateString()}</span>
                        </div>
                        {/* 
                            - the [Update Profile btn] will show for the loged user onnnnnnly and even the [admin]
                            - the [admin] can see all users profiles BUTT without see the [Update Profile btn] for every user 
                        */}
                        {
                            user?._id === profile?._id
                            &&
                            <>
                                <button
                                    className="btn-update"
                                    onClick={() => { dispatch(setShowModal()) }}
                                >
                                    <LiaEdit />Update Profile
                                </button>

                                <button
                                    className="delete-acc bg-danger"
                                    title="Delete your account"
                                    onClick={() => handleProfileDelete(user?._id)}
                                >
                                    <FaTrash />Delete Account
                                </button>
                            </>
                        }
                    </div>
                    <div className="user-profile-posts mt-5">
                        <h3 className="title">{profile?.username} Posts</h3>
                        <div className="all-posts d-flex gap-5 flex-wrap my-5">
                            {
                                userPosts?.length > 0 ?
                                    userPosts?.map(p => (
                                        <SinglePost
                                            post={p}
                                            key={p._id}
                                            userInLocalStorage={user}
                                            profile={profile}
                                            profileId={profile?._id}
                                            profileUsername={profile?.username}
                                            onPostDelete={handlePostDelete}
                                        />
                                    ))
                                    :
                                    <h2 className="no-post">{profile?.username}, has not any posts yet.</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                profile &&
                <UpdateUserModal
                    show={show}
                    setShowModal={setShowModal}
                    setHideModal={setHideModal}
                    profile={profile}
                    isProfileUpdated={isProfileUpdated}
                />
            }
        </>
    )
}

export default UserProfile;