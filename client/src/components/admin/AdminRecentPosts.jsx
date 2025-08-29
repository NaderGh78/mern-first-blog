import { Link } from "react-router-dom";
import imgSrc from "../../utils/constants";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminRecentPosts = ({ posts }) => {

  // check if the posts length is less than 5 show them, otherwise sliced the first 5 posts
  const slicedPosts = posts?.length < 5 ? posts : posts?.slice(0, 5);

  return (
    <div className='table-box recent-posts'>
      <h2>recent posts</h2>
      <table className="table table-hover table-bordered table-transparent">
        <thead>
          <tr>
            <th scope="col" className='text-center'>#</th>
            <th scope="col" className='text-center'>User</th>
            <th scope="col" className='text-center'>Title</th>
            <th scope="col" className='text-center'>Post Image</th>
            <th scope="col" className='text-center'>Category</th>
            <th scope="col" className='text-center text-nowrap'>Create At</th>
          </tr>
        </thead>
        <tbody>
          {slicedPosts?.map((el, idx) => (
            <tr key={idx}>
              <th scope="row" className='text-center'>{idx + 1}</th>
              <td className='text-capitalize bg-danger text-center'>
                <Link to={`/profile/${el.user._id}`} className="text-decoration-none text-dark">
                  {el.user.userImage &&
                    <img
                      src={el.user?.userImage?.url}
                      alt="avatar"
                      className="d-block mx-auto"
                      style={{ width: "33px", height: "33px" }}
                    />}
                </Link>
                <Link to={`/profile/${el.user._id}`} className="text-decoration-none text-dark">
                  <span
                    className="ms-2 text-nowrap"
                    style={{ color: "var(--light-white)" }}
                  >{el.user.username}</span>
                </Link>
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
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminRecentPosts;