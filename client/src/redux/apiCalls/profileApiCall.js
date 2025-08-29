import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Get All Users Profile (for admin dashboard)
export function getAllUsersProfile() {

  return async (dispatch) => {

    try {

      // get all users profiles
      const { data } = await request.get(`/api/users/profile`);

      dispatch(profileActions.setProfiles(data));

    } catch (error) {

      console.log(error.response.data.message);

    }

  }
}

/*===========================================*/

// Get User Profile 
export function getUserProfile(userId) {

  return async (dispatch) => {

    try {

      // run the loader
      dispatch(profileActions.setLoading());

      // get single user by provided id
      const { data } = await request.get(`/api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data));

      // remove the loader
      dispatch(profileActions.clearLoading());

    } catch (error) {

      console.log(error.response.data.message);

    }

  }
}

/*===========================================*/

// Update Profile (Account)
export function updateProfile(userId, profile) {

  return async (dispatch, getState) => {

    try {

      dispatch(profileActions.setIsProfileUpdated());

      // update user profile , need [token for logged user or admin + update content + provided id]
      const { data } = await request.put(`/api/users/profile/${userId}`, profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.updateProfile(data));

      dispatch(authActions.setUserPhoto(data.userImage));

      dispatch(authActions.setUsername(data.username));

      dispatch(profileActions.clearIsProfileUpdated());

      toast.success("Your Profile Has Been Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
      });

      // modify the user in local storage with new username
      const user = JSON.parse(localStorage.getItem("userInfo"));

      // the update user name will be from data
      user.username = data?.username;

      // the update user img will be from data
      user.userImage = data?.userImage;

      // save the new data user info in localstorage
      localStorage.setItem("userInfo", JSON.stringify(user));

    } catch (error) {

      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT
      });

    }

  }
}

/*===========================================*/

// Delete Profile (Account)
export function deleteProfile(userId) {

  return async (dispatch, getState) => {

    try {

      dispatch(profileActions.setLoading());

      /*
      delete user profile , need [token for logged user or admin + provided id] 
      cos the logged user or admin in dashbord can remove an user
      */
      const { data } = await request.delete(`/api/users/profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setIsProfileDeleted());

      // show success toast in case user delete his account successfully
      toast.success(data?.message, {
        position: toast.POSITION.TOP_RIGHT
      });

      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);

    } catch (error) {

      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT
      });

      dispatch(profileActions.clearLoading());

    }

  }
}

/*===========================================*/

// Get Users Count (for admin dashboard)
export function getUsersCount() {

  return async (dispatch, getState) => {

    try {

      // get users profile count ,need [token for admin]
      const { data } = await request.get(`/api/users/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(profileActions.setUserCount(data));

    } catch (error) {

      toast.error(error.response.data.message);

    }

  }
}