import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineUserGroup, HiChartPie } from 'react-icons/hi';
import { BsFilePost, BsFillPersonFill, BsFillTagFill } from "react-icons/bs";
import imgSrc from "../../utils/constants";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminSidebar = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  /*===========================================*/

  const Logout = () => {
    dispatch(logoutUser());
  };

  /*===========================================*/

  // show confirm msg,when need to logout admin
  const handleLogout = () => {
    confirmAlert({
      message: "Are you sure to logout ?",
      buttons: [{
        label: 'Yes',
        onClick: () => Logout()
      },
      { label: 'No' }
      ]
    });
  }

  /*===========================================*/

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <Link to="/" className="sidebar-title">go home page</Link>
        <ul className="list-unstyled">
          <li className="dash mt-5">
            <Link
              to="/admin"
              className={pathname === "/admin" ? "active" : ""}
            >
              <HiChartPie /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="posts"
              className={pathname === "/admin/posts" ? "active" : ""}
            >
              <BsFilePost /> Posts
            </Link>
          </li>
          <li>
            <Link
              to="users"
              className={pathname === "/admin/users" ? "active" : ""}
            >
              <HiOutlineUserGroup /> Users
            </Link>
          </li>
          <li>
            <Link
              to="categories"
              className={pathname === "/admin/categories" ? "active" : ""}
            >
              <BsFillTagFill /> Categories
            </Link>
          </li>
          <li>
            <Link
              to="customers"
              className={pathname === "/admin/customers" ? "active" : ""}
            >
              <FaRegCircleUser /> customers
            </Link>
          </li>
          <li className="dash-profile">
            <span><BsFillPersonFill /> Profile</span>
            <span>Admin</span>
          </li>
        </ul>
        <div className="sidebar-bottom">
          <img src={imgSrc + user?.userImage} alt="user image" />
          <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          <span
            onClick={handleLogout}
            className="text-white"
            style={{ borderBottom: "1px solid", cursor: "pointer" }}
          >logout</span>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar;