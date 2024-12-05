import { Link, useNavigate } from "react-router-dom";
import { LogOut, Mail, MessageCircle, Newspaper, Phone, Search, Users } from "lucide-react";
import { signOut } from 'firebase/auth';
import { auth } from "@/database/database";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const sidebarLinks = [
    { icon: <Phone className="mr-3 h-5 w-5" />, text: "Ramais", path: "/extensions" },
    { icon: <Mail className="mr-3 h-5 w-5" />, text: "Email", path: "/app/email" },
    { icon: <Newspaper className="mr-3 h-5 w-5" />, text: "Comunicados", path: "/communications" },
    { icon: <Search className="mr-3 h-5 w-5" />, text: "Index", path: "/app/document" },
    { icon: <MessageCircle className="mr-3 h-5 w-5" />, text: "Chat", path: "/app/chat" },
];


export const SidebarContent = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const isAdmin = user?.role === "admin";

    async function handleLogout() {
        await signOut(auth);
        navigate("/login");
    }

    return (
        <nav className="mt-4    ">
            {sidebarLinks.map(({ icon, text, path }) => (
                <Link
                    key={path}
                    to={path}
                    className="flex items-center px-4 py-2 text-gray-100 hover:bg-purple-950 hover:text-secondary"
                >
                    {icon}
                    {text}
                </Link>
            ))}
            {isAdmin && (
                <Link
                    to="/app/register-user"
                    className="flex items-center px-4 py-2 text-gray-100 hover:bg-purple-950 hover:text-secondary"
                >
                    <Users className="mr-3 h-5 w-5" />
                    Registrar usuário
                </Link>
            )}

            <Link
                to="/login"
                className="flex items-center px-4 py-2 text-gray-100 hover:bg-purple-950 hover:text-secondary"
                onClick={handleLogout}
            >
                <LogOut className="mr-3 h-5 w-5" />
                Sair
            </Link>
        </nav>
    )
};
