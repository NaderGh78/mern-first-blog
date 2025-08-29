import './topMenu.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/apiCalls/authApiCall";
import { toggleTheme } from '../../../redux/slices/themeSlice';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsFilePerson, BsBoxArrowInLeft } from "react-icons/bs";
import { FaUnlock } from "react-icons/fa6";
import { LiaSun } from "react-icons/lia";
import { FaRegMoon } from "react-icons/fa6";
import imgSrc from "../../../utils/constants";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const TopMenu = () => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { isDarkMode } = useSelector((state) => state.theme);

  /*===========================================*/

  // in order to make active class when navigate pages
  const [url, setUrl] = useState(null);

  // in order to close the menu and go smoothly when click on link inside it
  const [expanded, setExpanded] = useState(false);

  const location = useLocation("/");

  // give active class for link depend on location,and change the overflow of body depend is cart modal show or not
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  /*===========================================*/

  return (
    <div className='topmenu'>
      {/* make at the top of page with fixed-top*/}
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" expanded={expanded}>
        <Container fluid>
          <Navbar.Brand as={Link} to={"/"}>
            <h3 style={{ color: "var(--dark)" }} onClick={() => setExpanded(false)}>my <span>blog</span></h3>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* make the ul in center of navbar with mx-auto*/}
            <Nav className="mx-auto">
              <Nav.Link
                as={Link}
                to={"/"}
                className={url === "/" ? "active" : ""}
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              {user
                &&
                <>
                  <Nav.Link
                    as={Link}
                    to={"/create"}
                    className={url === "/create" ? "active" : ""}
                    onClick={() => setExpanded(false)}
                  >
                    Create
                  </Nav.Link>
                </>
              }
              {
                user?.isAdmin
                &&
                <>
                  <Nav.Link
                    as={Link}
                    to={"/admin"}
                    className={url === "/admin" ? "active" : ""}
                    onClick={() => setExpanded(false)}
                  >
                    Dashboard
                  </Nav.Link>
                </>
              }
            </Nav>
            {/* end first nav */}
            {user
              ?
              <>
                {/* toggle dark mode */}
                {
                  isDarkMode
                    ?
                    <FaRegMoon
                      className='toggle-icon'
                      onClick={() => {
                        dispatch(toggleTheme())
                        setExpanded(false)
                      }}
                    />
                    :
                    <LiaSun
                      className='toggle-icon'
                      onClick={() => {
                        dispatch(toggleTheme())
                        setExpanded(false)
                      }}
                    />
                }
                <Nav>
                  <div className="user-account">
                    <div className="dropdown">
                      <button
                        className="btn btn-white dropdown-toggle d-flex align-items-center"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <span className='text-capitalize fs-6'>{user?.username}</span>
                        <img src={user?.userImage?.url} alt="avatar" />
                      </button>
                      <ul className="dropdown-menu">
                        <li className='border-bottom pb-1'>
                          <span
                            className='d-block text-center text-capitalize'
                            style={{ fontSize: "13px" }}
                          >{user?.username}</span>
                          <span className='d-block text-center' style={{ fontSize: "13px" }}>{user?.email}</span>
                        </li>

                        <li className='border-bottom'>
                          <Link to={`/profile/${user?._id}`} className="dropdown-item"><BsFilePerson /> Profile</Link>
                        </li>
                        <li
                          onClick={
                            () => {
                              dispatch(logoutUser());
                              // in small screen , close the navbar when logout user
                              setExpanded(false)
                            }}
                        ><Link className="dropdown-item"><BsBoxArrowInLeft /> Logout</Link></li>
                      </ul>
                    </div>
                  </div>
                </Nav>
              </>
              :
              <>
                {/* toggle dark mode */}
                {
                  isDarkMode
                    ?
                    <FaRegMoon
                      className='toggle-icon'
                      onClick={() => {
                        dispatch(toggleTheme())
                        setExpanded(false)
                      }}
                    />
                    :
                    <LiaSun
                      className='toggle-icon'
                      onClick={() => {
                        dispatch(toggleTheme())
                        setExpanded(false)
                      }}
                    />
                }
                <Nav>
                  <Nav.Link
                    as={Link}
                    to="/login"
                    className='d-flex align-items-center gap-2'
                  >
                    <FaUnlock />
                    register/login
                  </Nav.Link>
                </Nav>
              </>
            }
            {/* end second nav */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default TopMenu;