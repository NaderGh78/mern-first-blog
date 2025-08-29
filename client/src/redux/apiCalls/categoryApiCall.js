import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Get All Categories 
export function fetchCategories() {

  return async (dispatch) => {

    try {

      // run the loader
      dispatch(categoryActions.setLoading());

      // get all categories
      const { data } = await request.get("/api/categories");

      dispatch(categoryActions.setCategories(data));

      // remove the loader
      dispatch(categoryActions.clearLoading());

    } catch (error) {

      toast.error(error.response?.data?.message);

      dispatch(categoryActions.clearLoading());

    }

  }
}

/*===========================================*/

// Create New Category
export function createCategory(newCategory) {

  return async (dispatch, getState) => {

    try {

      // create new category,need token of admin , cos the admin ONLY can create new category
      const { data } = await request.post("/api/categories", newCategory,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          }
        });

      dispatch(categoryActions.setNewCategory(data));

      // show success toast when category created succesfully
      toast.success("category created successfully");

    } catch (error) {

      toast.error(error.response.data.message);

    }

  }
}

/*===========================================*/

// Delete Category  
export function deleteCategory(catId) {

  return async (dispatch, getState) => {

    try {

      // delete category, need category id and token for admin to delete some cat
      const { data } = await request.delete(`/api/categories/${catId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(categoryActions.setDeleteCategory(data));

      // show success toast when category deleted succesfully
      toast.success("category deleted successfully");

    } catch (error) {

      console.log(error.response.data.message);

    }

  }
}

/*===========================================*/

// Get Categories Count (for admin dashboard)
export function getCategoriesCount() {

  return async (dispatch) => {

    try {

      // get the count of all categories for admin dashboard
      const { data } = await request.get(`/api/categories/count`);

      dispatch(categoryActions.setCategoriesCount(data));

    } catch (error) {

      toast.error(error.response.data.message);

    }

  }
} 