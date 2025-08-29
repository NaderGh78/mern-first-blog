import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// register new user
export function registerUser(user) {

    return async (dispatch) => {

        try {

            // run the loader
            dispatch(authActions.setLoading());

            // we need header, cos the user will upload his image when register
            const { data } = await request.post("/api/auth/register", user,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(data)

            // register new user depend on data
            dispatch(authActions.register(data));

            // remove loader
            dispatch(authActions.clearLoading());

            // when register is success , make the [errorRegisterMsg] empty,in order to empty the danger alert msg in browser
            dispatch(authActions.setErrorRegisterMsg(""));

            // show success toast in case the register is success 
            toast.success(data.message);

        } catch (error) {

            // show failed toast in case the register is FAILED
            toast.error(error.response?.data?.message);

            dispatch(authActions.clearLoading());

        }

    }
}

/*===========================================*/

// Login User
export function loginUser(user) {

    return async (dispatch) => {

        try {
            // run the loader
            dispatch(authActions.setLoading());

            const { data } = await request.post("/api/auth/login", user);

            dispatch(authActions.login(data));

            // remove loader
            dispatch(authActions.clearLoading());

            //if no error ,save the user info in localstorage
            localStorage.setItem("userInfo", JSON.stringify(data));

        } catch (error) {

            toast.error(error.response.data.message);

            dispatch(authActions.clearLoading());

        }

    }
}

/*===========================================*/

// Logout User
export function logoutUser() {

    return (dispatch) => {

        dispatch(authActions.logout());

        //if logout ,remover all user info from localstorage
        localStorage.removeItem("userInfo");

    }
} 