import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: [],
        post: null,
        postsCount: null,
        postsCate: [],
        loading: false,
        isPostCreated: false,
        isPostEdited: false,
        isPostDelete: false
    },
    reducers: {

        // for net posts without pagination
        setNetPosts(state, action) {
            state.posts = action.payload;
        },

        // for all posts
        setPosts(state, action) {
            state.posts = action.payload;
            state.loading = false;
        },

        // for single post
        setPost(state, action) {
            state.post = action.payload;
        },

        // for delete post
        setDeletePost(state, action) {
            state.posts = state.posts.filter(p => p._id !== action.payload);
        },

        // for posts count
        setPostsCount(state, action) {
            state.postsCount = action.payload;
        },

        // for category
        setPostsCate(state, action) {
            state.postsCate = action.payload;
        },

        // for like the post
        setLike(state, action) {
            state.post.likes = action.payload.likes;
        },

        addCommentToPost(state, action) {
            state.post.comments.push(action.payload);
        },

        updateCommentPost(state, action) {

            state.post.comments = state.post.comments.map(commment =>
                commment._id === action.payload._id ? action.payload : commment
            )
        },

        deleteCommentFromPost(state, action) {

            const comment = state.post.comments.find(c => c._id === action.payload);

            const commentIndex = state.post.comments.indexOf(comment);

            state.post.comments.splice(commentIndex, 1);

        },

        /*=========================== All Post Loading ===========================*/

        // show isPostCreated loading when create post
        setIsPostCreated(state) {
            state.isPostCreated = true;
        },

        // hide isPostCreated loading when create post finish
        clearIsPostCreated(state) {
            state.isPostCreated = false;
        },

        // show isPostEdited loading when edit post
        setIsPostEdited(state) {
            state.isPostEdited = true;
        },

        // hide isPostEdited loading when edit post finish
        clearIsPostEdited(state) {
            state.isPostEdited = false;
        },

        // show isPostDelete loading when post deleted
        setIsPostDelete(state) {
            state.isPostDelete = true;
        },

        // hide isPostDelete loading when post deleted finish 
        clearIsPostDelete(state) {
            state.isPostDelete = false;
        },

        setLoading(state) {
            state.loading = true;
        },

        clearLoading(state) {
            state.loading = false;
        }

    }
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;
export { postActions, postReducer }