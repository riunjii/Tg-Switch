import { createBrowserRouter } from "react-router-dom";
import { Login } from "./pages/public-routes/auth/login";
import { Home } from "./pages/admin/Home";
import { Chat } from "./pages/admin/Chat";
import { EmailPage } from "./pages/admin/email";
import { DocumentSearch } from "./pages/admin/Document";

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
                element: <Home />,
            },
            {
                path: "chat",
                element: <Chat />,
            },
            {
                path: "email",
                element: <EmailPage />
            },
            {
                path: "document",
                element: <DocumentSearch />
            }
        ],
    },
]);
