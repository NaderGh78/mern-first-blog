import { Link } from "react-router-dom";
import imgSrc from "../../utils/constants";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AdminRecentUsers = ({ profiles }) => {

    // check if the users number is less than 5 show them, otherwise sliced the first 5 users
    const slicedUsers = profiles?.length < 5 ? profiles : profiles?.slice(0, 5);

    return (
        <div className='table-box recent-users'>
            <h2 className="h2 text-capitalize text-dark">recent users</h2>
            <table className="table table-hover table-bordered table-transparent">
                <thead>
                    <tr>
                        <th scope="col" className='text-center'>#</th>
                        <th scope="col" className='text-center'>User</th>
                        <th scope="col" className='text-center'>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {slicedUsers?.map((el, idx) => (
                        <tr key={idx}>
                            <th scope="row" className='text-center'>{idx + 1}</th>
                            <td className='text-center text-capitalize'>
                                <Link to={`/profile/${el._id}`} className="text-decoration-none text-dark">
                                    {el.userImage &&
                                        <img
                                            src={el.userImage?.url}
                                            alt="user image"
                                            className="d-block mx-auto"
                                            style={{ width: "33px", height: "33px" }}
                                        />
                                    }
                                </Link>
                                {el.username}
                            </td>
                            <td className='text-center'>
                                <a href={`mailto:${el.email}`} target="_blank">{el.email}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminRecentUsers;