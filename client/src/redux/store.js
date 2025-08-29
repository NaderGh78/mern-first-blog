import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { categoryReducer } from "./slices/categorySlice";
import { customerReducer } from "./slices/customerSlice";
import { postReducer } from "./slices/postSlice";
import { commentReducer } from "./slices/commentSlice";
import { themeReducer } from "./slices/themeSlice";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        category: categoryReducer,
        customer: customerReducer,
        post: postReducer,
        comment: commentReducer,
        theme: themeReducer
    }
});

export default store;