import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersProfile, getUsersCount } from "../../redux/apiCalls/profileApiCall";
import { getCategoriesCount } from "../../redux/apiCalls/categoryApiCall";
import { getCustomersCount } from "../../redux/apiCalls/customerApiCall";
import { getAllPostsForAdmin, getPostsCount } from "../../redux/apiCalls/postApiCall";
import AdminRecentUsers from "./AdminRecentUsers";
import AdminRecentPosts from "./AdminRecentPosts";
import { BsFilePost, BsFillTagFill } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminMain = () => {

    const dispatch = useDispatch();

    const { usersCount } = useSelector((state) => state.profile);

    const { categoriesCount, categories } = useSelector((state) => state.category);

    const { customersCount } = useSelector((state) => state.customer);

    const { postsCount, posts } = useSelector((state) => state.post);

    const { profiles } = useSelector((state) => state.profile);

    /*===========================================*/

    useEffect(() => {
        dispatch(getUsersCount());
        dispatch(getCategoriesCount());
        dispatch(getCustomersCount());
        dispatch(getPostsCount());

    }, [usersCount, categoriesCount, categories, customersCount, postsCount]);

    /*===========================================*/

    useEffect(() => {
        dispatch(getAllUsersProfile());
    }, [profiles]);

    /*===========================================*/

    useEffect(() => {
        dispatch(getAllPostsForAdmin());
    }, []);

    /*===========================================*/

    return (
        <div className='admin-main'>
            <div className="admin-main-sections">
                <div className="single-section">
                    <h4>Posts</h4>
                    <span className="text-danger fw-bold h3">{postsCount}</span>
                    <div className="single-section-bottom">
                        <Link to="posts">see all posts</Link>
                        <span><BsFilePost /></span>
                    </div>
                </div>
                <div className="single-section">
                    <h4>Users</h4>
                    <span className="text-danger fw-bold h3">{usersCount}</span>
                    <div className="single-section-bottom">
                        <Link to="users">see all users</Link>
                        <span><HiOutlineUserGroup /></span>
                    </div>
                </div>
                <div className="single-section">
                    <h4>Categories</h4>
                    <span className="text-danger fw-bold h3">{categoriesCount}</span>
                    <div className="single-section-bottom">
                        <Link to="categories">see all categories</Link>
                        <span><BsFillTagFill /></span>
                    </div>
                </div>
                <div className="single-section">
                    <h4>Customers</h4>
                    <span className="text-danger fw-bold h3">{customersCount}</span>
                    <div className="single-section-bottom">
                        <Link to="customers">see all Customers</Link>
                        <span><FaRegCircleUser /></span>
                    </div>
                </div>
            </div>
            <div className="recents">
                <AdminRecentUsers profiles={profiles} />
                <AdminRecentPosts posts={posts} />
            </div>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default AdminMain;