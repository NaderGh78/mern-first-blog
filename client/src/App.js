import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

/*===========================================*/
/*===========================================*/
/*===========================================*/

function App() {

    const { isDarkMode } = useSelector((state) => state.theme);

    /*===========================================*/

    // in case toggle dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    /*===========================================*/

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App; 