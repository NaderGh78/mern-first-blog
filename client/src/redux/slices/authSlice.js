import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ?
            JSON.parse(localStorage.getItem("userInfo")) : null,
        register: null,
        errorRegisterMsg: "",
        loading: false
    },
    reducers: {

        login(state, action) {
            state.user = action.payload;
        },

        logout(state) {
            state.user = null;
        },

        register(state, action) {
            state.register = action.payload;
        },

        setErrorRegisterMsg(state, action) {
            state.errorRegisterMsg = action.payload;
        },

        setUsername(state, action) {
            state.user.username = action.payload;
        },

        setUserPhoto(state, action) {
            state.user.userImage = action.payload;
        },

        setLoading(state) {
            state.loading = true;
        },

        clearLoading(state) {
            state.loading = false;
        }

    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer }