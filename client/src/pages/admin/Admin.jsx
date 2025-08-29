import './admin.css';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminNav from '../../components/admin/AdminNav';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Admin = () => {

  const { user } = useSelector((state) => state.auth);

  /*===========================================*/

  return (
    <>
      {/* check it there is an user , and the user is admin show the content , otherwise not show home page */}
      {user?.isAdmin
        ?
        <>
          <div className='admin'>
            <div className="admin-content">
              <AdminNav />
              <Outlet />
            </div>
          </div>
        </>
        :
        <Navigate to="/" replace />
      }
    </>
  );
}

export default Admin;