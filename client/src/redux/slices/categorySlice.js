import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        deleteCategory: false,
        categoriesCount: null,
        loading: false,
        success: false,
        failed: false,
        showNewCatModal: false,
    },
    reducers: {

        setCategories(state, action) {
            state.categories = action.payload;
            state.loading = false;
        },

        setNewCategory(state, action) {
            state.categories = action.payload;
        },

        setDeleteCategory(state, action) {
            state.deleteCategory = action.payload;
        },

        setCategoriesCount(state, action) {
            state.categoriesCount = action.payload;
        },

        setLoading(state) {
            state.loading = true;
        },

        clearLoading(state) {
            state.loading = false;
        },

        setSuccess(state, action) {
            state.success = action.payload;
        },

        // show the [new category modal]
        setShowNewCatModal(state) {
            state.showNewCatModal = true;
        },

        // hide the [new category modal]
        setHideNewCatModal(state) {
            state.showNewCatModal = false;
        }

    }
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;
export const { setShowNewCatModal, setHideNewCatModal } = categorySlice.actions;
export { categoryActions, categoryReducer }