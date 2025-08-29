import './editPost.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePost, updatePost } from '../../../redux/apiCalls/postApiCall';
import { fetchCategories } from '../../../redux/apiCalls/categoryApiCall';
import { LiaUploadSolid } from "react-icons/lia";
import { ToastContainer } from 'react-toastify';

/*===========================================*/
/*===========================================*/
/*===========================================*/

const EditPost = () => {

    const dispatch = useDispatch();

    const { post, isPostEdited } = useSelector((state) => state.post);

    const { categories } = useSelector((state) => state.category);

    const { id } = useParams();

    const [title, setTitle] = useState("");

    const [category, setCategory] = useState("");

    const [description, setDescritption] = useState("");

    const [file, setFile] = useState(null);

    /*===========================================*/

    const setimgfile = (e) => {
        setFile(e.target.files[0])
    }

    /*===========================================*/

    // fetch all categories to draw the select and options
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    /*===========================================*/

    // change the [title,category,description],when post already changed ,in order to put them as an old values inside the inputs
    useEffect(() => {
        setTitle(post?.title);
        setCategory(post?.category);
        setDescritption(post?.description);
    }, [post]);

    /*===========================================*/

    useEffect(() => {
        dispatch(getSinglePost(id));
    }, [id]);

    /*===========================================*/

    const editPostHandler = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        file && formData.append("postImage", file);
        // update post with all formdata data
        dispatch(updatePost(formData, post?._id));
    }

    /*===========================================*/

    return (
        <div className='edit-post'>
            <div className="edit-post-box">
                <form className="my-form" onSubmit={editPostHandler} noValidate>
                    <h1 className="h2 text-center mb-3 text-capitalize" style={{ color: "var(--dark)" }}>Edit Post</h1>
                    <div className="form-group">
                        <label htmlFor="editPostTitle">Post Title</label>
                        <input
                            type="text"
                            className="form-control my-input"
                            id="editPostTitle"
                            placeholder="Post Title"
                            autoComplete="off"
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="editSelectCat">Select a Category</label>
                        <select
                            className="form-control my-input mb-2"
                            id="editSelectCat"
                            value={category || ""}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option disabled value="">
                                Select A Category
                            </option>
                            {categories?.map((category) => (
                                <option key={category._id} value={category.title}>
                                    {category.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="editPostDescription">Post Description</label>
                        <textarea
                            className="form-control my-input"
                            id="editPostDescription"
                            rows="3"
                            placeholder="Post Description"
                            value={description || ""}
                            onChange={(e) => setDescritption(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="customFile-box">
                        <h3>Edit Post Image</h3>
                        <label htmlFor="myFile"><LiaUploadSolid /></label>
                        <input
                            type="file"
                            className="form-control my-input"
                            id="myFile"
                            name='file'
                            onChange={setimgfile}
                            accept="image/*"
                        />
                        {/* {file?.name ? <span>{file?.name}</span> : <span>{oldImagName}</span>} */}
                    </div>

                    <div className="text-center">
                        <button type="submit" className="d-flex justify-content-center mx-auto">
                            {!isPostEdited
                                ? "Edit"
                                :
                                <>
                                    <div
                                        className="spinner-border"
                                        style={{ width: "24px", height: "24px", borderWidth: "2px", color: "#fff" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </>}
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer autoClose={6000} />
        </div>
    )
}

export default EditPost;