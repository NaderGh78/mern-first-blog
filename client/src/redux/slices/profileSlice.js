import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        profiles: [],
        isProfileDeleted: false,
        isProfileUpdated: false,
        show: false,//this for update user modal 
        usersCount: null,
        loading: false
    },
    reducers: {

        setProfilePhoto(state, action) {
            state.profile.userImage = action.payload;
        },

        setProfile(state, action) {
            state.profile = action.payload;
        },

        setProfiles(state, action) {
            state.profiles = action.payload;
        },

        updateProfile(state, action) {
            state.profile = action.payload;
        },

        setLoading(state) {
            state.loading = true;
        },

        clearLoading(state) {
            state.loading = false;
        },

        setIsProfileDeleted(state) {
            state.isProfileDeleted = true;
            state.loading = false;
        },

        clearIsProfileDeleted(state) {
            state.isProfileDeleted = false;
        },

        // when user update his data
        setIsProfileUpdated(state) {
            state.isProfileUpdated = true;
        },

        clearIsProfileUpdated(state) {
            state.isProfileUpdated = false;
        },

        setUserCount(state, action) {
            state.usersCount = action.payload;
        },

        setShowModal(state) {
            state.show = true;
        },

        setHideModal(state) {
            state.show = false;
        }

    }
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;
export const { setShowModal, setHideModal } = profileSlice.actions;
export { profileActions, profileReducer };