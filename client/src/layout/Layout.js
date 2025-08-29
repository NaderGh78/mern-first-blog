import { Outlet, useLocation } from "react-router-dom";
import { ScrollToTopWhenNavigatePage, TopMenu } from "../allPagesPaths";

/*===========================================*/
/*===========================================*/
/*===========================================*/

const Layout = () => {

    // const { pathname } = useLocation();

    // here we make array of the paths, that will remove the [header and footer] from it pages
    //   const hideHeaderAndFooterForPaths = ['/login', '/register', '/admin', '/admin/add', '/admin/viewUser/', '/admin/update/'];

    return (
        <>
            {/* {!hideHeaderAndFooterForPaths.includes(pathname) && <TopMenu />} */}
            {/* {!hideHeaderAndFooterForPaths.some(path => pathname.match(path)) && <TopMenu />} */}
            <TopMenu />
            <Outlet />
            {/* scroll to top when NAVIGATEEEEEEE between the pages */}
            <ScrollToTopWhenNavigatePage />
        </>
    )
}

export default Layout;