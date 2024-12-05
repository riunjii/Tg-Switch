import { AuthContext } from "@/context/AuthContext";
import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps) {
    const { signed, loadingAuth } = useContext(AuthContext);

    if (loadingAuth) {
        return
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children;
}