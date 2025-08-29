import "./createPost.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../../redux/apiCalls/categoryApiCall";
import { LiaUploadSolid } from "react-icons/lia";
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const CreatePost = () => {

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  const { loading, isPostCreated } = useSelector((state) => state.post);

  const [title, setTitle] = useState("");

  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);

  /*===========================================*/

  // create post handler
  const createPostHandler = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    // cos the image is optional , we should check if the there is image upload or not
    file && formData.append("postImage", file);

    // create post  
    const res = await dispatch(createPost(formData));

    if (res?.success) {
      setTitle("");
      setCategory("");
      setDescription("");
      setFile(null);
    }

  };

  /*===========================================*/

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  /*===========================================*/

  return (
    <>
      <div className="create-post">
        <div className="create-post-box">
          <form className="my-form" onSubmit={createPostHandler} noValidate encType="multipart/form-data">
            <h1>Create New Post</h1>
            <div className="form-group">
              <label htmlFor="postTitle">Post Title <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control my-input"
                id="postTitle"
                placeholder="Post Title"
                autoComplete="off"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="selectCat">Select a Category <span className="text-danger">*</span></label>
              <select
                className="form-control my-input mb-2"
                id="selectCat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled value="">
                  Select A Category
                </option>
                {categories && categories?.map((category) => (
                  <option key={category._id} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="postDescription">Post Description <span className="text-danger">*</span></label>
              <textarea
                className="form-control my-input"
                id="postDescription"
                rows="3"
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="customFile-box">
              <h3>Post Image</h3>
              <label htmlFor="myFile"><LiaUploadSolid /></label>
              <input
                type="file"
                className="form-control my-input"
                id="myFile"
                name='file'
                onChange={(e) => setFile(e.target.files[0])}
                accept="image/*"
              />
              {/* {file?.name && <span>{file?.name}</span>} */}
            </div>
            {/* {postImage && <img className="img-fluid" src={postImage} alt="post" />}  */}
            <div className="text-center">
              <button type="submit" className="d-flex justify-content-center mx-auto">
                {isPostCreated
                  ?
                  <>
                    <div
                      className="spinner-border"
                      style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </>
                  :
                  "Create"
                }
              </button>
            </div>
          </form>
        </div>
        <ToastContainer autoClose={6000} />
      </div>
    </>
  )
}

export default CreatePost;