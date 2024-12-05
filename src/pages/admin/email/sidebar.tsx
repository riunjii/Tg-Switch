import { ScrollArea } from "@/components/ui/scroll-area";
import { Mails } from "lucide-react";

interface Email {
    id: string;
    subject: string;
    sender: string;
    preview: string;
}

interface SidebarProps {
    emails: Email[];
    onSelectEmail: (email: Email) => void;
}

export const Sidebar = ({ emails, onSelectEmail }: SidebarProps) => {
    return (
        <div className="h-full border-r border-purple-500">
            <ScrollArea className="h-full">
                <div className="w-full flex gap-4 items-center ml-4 mt-2">
                    <Mails className="text-white w-8 h-8" />
                    <span className="font-semibold text-white">Caixa de entrada</span>
                </div>
                {emails.length === 0 ? (
                    <p className="text-gray-400 text-center mt-4">Nenhum email encontrado.</p>
                ) : (
                    emails.map((email) => (
                        <div
                            key={email.id}
                            className="p-4 border-b border-purple-500 cursor-pointer hover:bg-secondary/50"
                            onClick={() => onSelectEmail(email)}
                        >
                            <h3 className="font-semibold truncate text-white">
                                {email.subject}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate text-purple-700">
                                {email.sender}
                            </p>
                            <p className="text-sm truncate text-gray-300">{email.preview}</p>
                        </div>
                    ))
                )}
            </ScrollArea>
        </div>
    );
};
