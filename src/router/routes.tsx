import { createBrowserRouter } from "react-router-dom";
import { Private } from "./private-route";
import { Login } from "@/pages/public-routes/auth/login";
import { DocumentSearch } from "@/pages/admin/Document";
import { EmailPage } from "@/pages/admin/email";
import { RegisterUserPage } from "@/pages/admin/Register-user";
import { Home } from "@/pages/admin/Home";
import { Chat } from "@/pages/admin/Chat";
import { NotFound } from "@/pages/public-routes/error/404";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "/app",
        children: [
            {
                path: "home",
                element: <Private><Home /></Private>,
            },
            {
                path: "chat",
                element: <Private><Chat /></Private>,
            },
            {
                path: "email",
                element: <Private><EmailPage /></Private>
            },
            {
                path: "document",
                element: <Private><DocumentSearch /></Private>
            },
            {
                path: "register-user",
                element: <Private><RegisterUserPage /></Private>
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />
    }
]);
