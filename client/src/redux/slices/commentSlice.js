import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const commentSlice = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        showUpdateCommentModal: false,
        commentLoading: false,
        isCommentDelete: false,
    },
    reducers: {

        setComments(state, action) {
            state.comments = action.payload;
        },

        deleteComment(state, action) {
            state.comments = state.comments.filter(c => c._id !== action.payload);
            state.isCommentDelete = true
        },

        // show the [show single customer modal]
        setShowUpdateCommentModal(state) {
            state.showUpdateCommentModal = true;
        },

        // hide the [show single customer modal]
        setHideUpdateCommentModal(state) {
            state.showUpdateCommentModal = false;
        },

        setLoading(state) {
            state.commentLoading = true;
        },

        clearLoading(state) {
            state.commentLoading = false;
        }

    }
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;
export const { setShowUpdateCommentModal, setHideUpdateCommentModal } = commentSlice.actions;
export { commentActions, commentReducer }