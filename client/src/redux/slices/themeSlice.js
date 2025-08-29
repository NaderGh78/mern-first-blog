import { createSlice } from "@reduxjs/toolkit";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: localStorage.getItem("isDarkMode") != undefined
            ? JSON.parse(localStorage.getItem("isDarkMode"))
            : false
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", state.isDarkMode);
        }
    }
});

const themeReducer = themeSlice.reducer;
const themeActions = themeSlice.actions;
export const { toggleTheme } = themeSlice.actions;
export { themeActions, themeReducer }