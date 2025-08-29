import "./login.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Login = () => {

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const history = useNavigate();

  /*===========================================*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }));

    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  /*===========================================*/

  return (
    <>
      {!user
        ?
        <>
          <div className="login register">
            <div className="container">
              <div className="register-content register-style">
                <div className="left">
                  <form className="my-form" onSubmit={handleSubmit} noValidate>
                    <div
                      className={`${errorMsg !== ""
                        ? "alert alert-danger my-alert visible" :
                        "alert alert-danger my-alert"}`}
                      role="alert"
                    >
                      {/* remove the [double quotations from string] */}
                      {errorMsg !== "" && <span>{errorMsg.replace(/["']/g, "")}</span>}
                    </div>
                    <h1 className="h2 text-center mb-3 text-capitalize">login to your account</h1>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control my-input"
                        id="email"
                        placeholder="Enter Your Email"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control my-input"
                        id="password"
                        placeholder="Enter Your Password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="text-center">
                      <button type="submit">
                        {loading
                          ?
                          <>
                            <div
                              className="spinner-border"
                              style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </>
                          :
                          "Sign In"
                        }
                      </button>
                    </div>

                  </form>
                </div>
                <div className="right">
                  <h2>New Here ?</h2>
                  <Link to="/register">Sign Up</Link>
                </div>
              </div>
            </div>
            <ToastContainer autoClose={6000} />
          </div>
        </>
        :
        <Navigate to="/" replace />
      }
    </>
  )
}

export default Login;