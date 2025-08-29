import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const EditCommentForm = ({ commentDetails, setShowEditComment }) => {

    const dispatch = useDispatch();

    const [text, setText] = useState(commentDetails?.text);

    /*===========================================*/

    // edit single comment handler
    const editSingleCommentHandler = (e) => {
        e.preventDefault();
        dispatch(updateComment(commentDetails?._id, { text }));
        setShowEditComment(false)
    };

    /*===========================================*/

    return (
        <div>
            <form className="my-3" onSubmit={editSingleCommentHandler}>
                <div className="form-group">
                    <textarea
                        cols="60"
                        rows="2"
                        placeholder="Edit a comment"
                        className="mytextarea p-2 border border-2 rounded w-100"
                        style={{ backgroundColor: "transparent", color: "var(--light-white)" }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                </div>
                <div className="btn-box text-end">
                    <button className="btn btn-small bg-success text-white rounded-1 py-0 px-2 me-1">Save</button>
                    <span
                        className="btn btn-small bg-danger text-white rounded-1 py-0 px-2"
                        onClick={() => setShowEditComment(false)}
                    >Cancel</span>
                </div>
            </form>
        </div>
    )
}

export default EditCommentForm;