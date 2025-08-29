import { postActions } from "../slices/postSlice";
import { commentActions } from "../slices/commentSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Fetch All Comments
export function fetchAllComments() {

  return async (dispatch) => {

    try {

      const { data } = await request.get(`/api/comment`);

      dispatch(commentActions.setComments(data));

    } catch (error) {

      toast.error(error.response.data.message);

    }

  }
}

/*===========================================*/

// Create Comment
export function createComment(newComment) {

  return async (dispatch, getState) => {

    try {

      // run the lodader
      dispatch(commentActions.setLoading());

      // create new cat, need the comment text and token, cos ONLY logged user or admin can create comment
      const { data } = await request.post("/api/comment", newComment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        });

      // remove the loader
      dispatch(commentActions.clearLoading());

      // add comment to post
      dispatch(postActions.addCommentToPost(data));

      // show success toast in case new comment added successfully
      toast.success("New Comment Added Successfully", {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch (error) {

      toast.error(error?.response?.data?.message);

      dispatch(commentActions.clearLoading());

    }

  }
}

/*===========================================*/

// Update Comment
export function updateComment(commentId, comment) {

  return async (dispatch, getState) => {

    try {

      // update cat, need the comment text and id and token, cos ONLY logged user or admin can create AND update comment
      const { data } = await request.put(`/api/comment/${commentId}`, comment,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      // update comment in post
      dispatch(postActions.updateCommentPost(data));

      // show success toast in case comment updated successfully
      toast.success("Comment Has Been Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch (error) {

      toast.error(error.response.data.message);

    }

  }
}

/*===========================================*/

// Delete Comment
export function deleteComment(commentId) {

  return async (dispatch, getState) => {

    dispatch(commentActions.setLoading());

    try {

      // delete cat, need the comment text and id and token, cos ONLY logged user or admin can create AND update AND delete comment
      await request.delete(`/api/comment/${commentId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        });

      dispatch(commentActions.clearLoading());

      // show succes toast when comment deleted successfully
      toast.success("Comment Has Been Deleted Successfully");

      // delete comment with id provided
      dispatch(commentActions.deleteComment(commentId));

      // delete comment from the post
      dispatch(postActions.deleteCommentFromPost(commentId));

    } catch (error) {

      toast.error(error?.response?.data?.message);

    }
  }
}