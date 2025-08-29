import "./register.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import { LiaUploadSolid } from "react-icons/lia";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Register = () => {

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [bio, setBio] = useState("");

  const [file, setFile] = useState(null);

  /*===========================================*/

  const setimgfile = (e) => {
    setFile(e.target.files[0])
  }

  /*===========================================*/

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    bio && formData.append("bio", bio);
    // cos the image is optional , we should check if the there is image upload or not
    file && formData.append("userImage", file);
    // registerUser
    dispatch(registerUser(formData));
  };

  /*===========================================*/

  return (
    <>
      {!user
        ?
        <>
          <div className="register register">
            <div className="container">
              <div className="register-content register-style flex-row-reverse">
                <div className="left">
                  <form className="my-form" onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                    <h1 className="h2 text-center mb-3 text-capitalize">Create Account</h1>
                    <div className="form-group">
                      <label htmlFor="username">Username <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control my-input"
                        id="username"
                        placeholder="Enter Your Name"
                        autoComplete="off"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email <span className="text-danger">*</span></label>
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
                      <label htmlFor="password">Password <span className="text-danger">*</span></label>
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

                    <div className="form-group">
                      <label htmlFor="userBio">Bio</label>
                      <input
                        type="text"
                        className="form-control my-input"
                        id="userBio"
                        placeholder="Enter Your Bio"
                        autoComplete="off"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>

                    <div className="customFile-box">
                      <h3>Upload Image</h3>
                      <label htmlFor="myFile"><LiaUploadSolid /></label>
                      <input
                        type="file"
                        className="form-control my-input"
                        id="myFile"
                        name='file'
                        onChange={(e) => setFile(e.target.files[0])}
                        accept="image/*"
                      />
                      {file?.name && <span>{file?.name}</span>}
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
                          "Sign Up"
                        }
                      </button>
                    </div>

                  </form>
                </div>
                <div className="right">
                  <h2>Welcome Back</h2>
                  <Link to="/login">Sign In</Link>
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

export default Register;