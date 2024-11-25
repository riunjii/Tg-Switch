import { Link } from "react-router-dom";
import { Mail, MessageCircle, Newspaper, Phone, Search } from "lucide-react";

const sidebarLinks = [
    { icon: <Phone className="mr-3 h-5 w-5" />, text: "Ramais", path: "/extensions" },
    { icon: <Mail className="mr-3 h-5 w-5" />, text: "Email", path: "/app/email" },
    { icon: <Newspaper className="mr-3 h-5 w-5" />, text: "Comunicados", path: "/communications" },
    { icon: <Search className="mr-3 h-5 w-5" />, text: "Index", path: "/app/document" },
    { icon: <MessageCircle className="mr-3 h-5 w-5" />, text: "Chat", path: "/app/chat" },
];

export const SidebarContent = () => (
    <nav className="mt-4">
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
    </nav>
);
