import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customer: null,
        customers: [],
        deleteCustomer: false,
        showSingleCustomerModal: false,
        showAddNewCustomerModal: false,
        showUpdateCustomerModal: false,
        customersCount: null
    },
    reducers: {

        setCustomers(state, action) {
            state.customers = action.payload;
        },

        setCustomer(state, action) {
            state.customer = action.payload;
        },

        setUpdateCustomer(state, action) {
            state.customer = action.payload;
        },

        setDeleteCustomer(state, action) {
            state.customers = action.payload;
        },
        setCustomersCount(state, action) {
            state.customersCount = action.payload;
        },

        // show the [show single customer modal]
        setShowSingleCutomerModal(state) {
            state.showSingleCustomerModal = true;
        },

        // hide the [show single customer modal]
        setHideSingleCustomerModal(state) {
            state.showSingleCustomerModal = false;
        },

        // show the [add new customer modal]
        setShowAddNewCutomerModal(state) {
            state.showAddNewCustomerModal = true;
        },

        // hide the [add new customer modal]
        setHideAddNewCustomerModal(state) {
            state.showAddNewCustomerModal = false;
        },

        // show the [edit customer modal]
        setShowUpdateCutomerModal(state) {
            state.showUpdateCustomerModal = true;
        },

        // hide the [edit customer modal]
        setHideUpdateCustomerModal(state) {
            state.showUpdateCustomerModal = false;
        }

    }
});

const customerReducer = customerSlice.reducer;
const customerActions = customerSlice.actions;
export const {
    setShowSingleCutomerModal,
    setHideSingleCustomerModal,
    setShowAddNewCutomerModal,
    setHideAddNewCustomerModal,
    setShowUpdateCutomerModal,
    setHideUpdateCustomerModal
} = customerSlice.actions;
export { customerActions, customerReducer }; 