import { useContext, useEffect } from "react"
import { Logo } from "./Logo"
import { RegistrationForm } from "./Registration-form"
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const RegisterUserPage = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (user?.role != 'admin') {
            navigate('/app/home')
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-950">
            <div className="max-w-md w-full space-y-8 p-8 bg-gradient-to-br from-indigo-950 to-purple-950 rounded-xl shadow-md border border-purple-500">
                <Logo />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Criar conta
                </h2>
                <RegistrationForm />
            </div>
        </div>
    )
}