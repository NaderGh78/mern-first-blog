import { customerActions } from "../slices/customerSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

/*===========================================*/
/*===========================================*/
/*===========================================*/

// Get All Customers (for admin dashboard)
export function getAllCustomers() {

  return async (dispatch, getState) => {

    try {

      // get all customers,need tokken for admin ,cos ONLY the admin can get all customers
      const { data } = await request.get(`/api/customer`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(customerActions.setCustomers(data));

    } catch (error) {

      console.log(error.response.data.message);

    }

  }
}

/*===========================================*/

// Get Single Customer (for admin dashboard)
export function getSingleCustomer(customerId) {

  return async (dispatch, getState) => {

    try {

      // get single customer, need id provided and token for admin,cos ONLY the admin can get some of customer
      const { data } = await request.get(`/api/customer/${customerId}`,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(customerActions.setCustomer(data));

    } catch (error) {

      console.log(error.response.data.message);

    }

  }
}

/*===========================================*/

// Add New Customer (for admin dashboard)
export function addNewCustomer(newCustomer) {

  return async (dispatch, getState) => {

    try {

      // add new customer, need customer content and token for admin,cos ONLY the admin can create new customer
      const { data } = await request.post("/api/customer", newCustomer,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      // add new customer depend on data
      dispatch(customerActions.setCustomer(data));

      // show success toast in case new customer added succefully
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch (error) {

      toast.error(error?.response?.data?.message, {
        position: toast.POSITION.TOP_RIGHT
      });

    }

  }
}

/*===========================================*/

// Update Customer (for admin dashboard)
export function updateCustomer(customerId, customer) {

  return async (dispatch, getState) => {

    try {

      // update customer, need id provided and new content and token for admin,cos ONLY the admin can update a customer
      const { data } = await request.put(`/api/customer/${customerId}`, customer,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(customerActions.setUpdateCustomer(data));

      // show success toast in case update customer succefully
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT
      });

    } catch (error) {

      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT
      });

    }

  }
}

/*===========================================*/

// Delete Customer (for admin dashboard)
export function deleteCustomer(customerId) {

  return async (dispatch, getState) => {

    try {

      // delete a customer, need id provided and token for admin,cos ONLY the admin can delete a customer
      const { data } = await request.delete(`/api/customer/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(customerActions.setDeleteCustomer(data));

    } catch (error) {

      console.log(error.response.data.message);

    }

  }
}

/*===========================================*/

// Get Categories Count (for admin dashboard)
export function getCustomersCount() {

  return async (dispatch, getState) => {

    try {

      // get all customers count , need token for admin,cos ONLY the admin can get the customers count
      const { data } = await request.get(`/api/customer/count`,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );

      dispatch(customerActions.setCustomersCount(data));

    } catch (error) {

      toast.error(error.response.data.message);

    }

  }
} 