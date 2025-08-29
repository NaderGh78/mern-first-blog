import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const AddminCategoryForm = () => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    /*===========================================*/

    // Form Submit Handler
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        dispatch(createCategory({ title }));
        setTitle("");
    };

    /*===========================================*/

    return (
        <div className="admin-add-category">
            <form onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="title">Category Title</label>
                    <input
                        type="text"
                        className="form-control my-input mt-1"
                        id="title"
                        placeholder="Enter Category Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn bg-success w-100 text-white">Add</button>
            </form>
        </div>
    )
}

export default AddminCategoryForm;