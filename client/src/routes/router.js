import { createBrowserRouter } from "react-router-dom";
import {
    Admin,
    CreatePost,
    Home,
    Login,
    NotFound,
    Register,
    UserProfile,
    Layout,
    ProtectRoute,
    AdminCategories,
    AdminMain,
    AdminCustomersTable,
    AdminUsersTable,
    PostDetails,
    EditPost,
    AdminPostsTable,
    CategoriesDetails
} from "../allPagesPaths";

/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++++++++++*/

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "",
                element: <ProtectRoute />,
                children: [
                    {
                        path: "/create",
                        element: <CreatePost />
                    }
                ]
            },
            {
                path: "/profile/:id",
                element: <UserProfile />
            },
            {
                path: "/post-details/:id",
                element: <PostDetails />
            },
            {
                path: "/post-edit/:id",
                element: <EditPost />
            },
            {
                path: "post/category/:category",
                element: <CategoriesDetails />
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        index: true,
                        element: <AdminMain />
                    },
                    {
                        path: "posts",
                        element: <AdminPostsTable />
                    },
                    {
                        path: "users",
                        element: <AdminUsersTable />
                    },
                    {
                        path: "categories",
                        element: <AdminCategories />
                    },
                    {
                        path: "customers",
                        element: <AdminCustomersTable />
                    }
                ]
            },
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },

    {
        path: "*",
        element: <NotFound />
    }
]);