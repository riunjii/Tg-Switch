import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { EmailProps } from ".";

interface NotificationProps {
    email: EmailProps | null;
}

export const Notification = ({ email }: NotificationProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    className="relative border-none bg-gradient-to-br from-indigo-950 to-purple-950"
                >
                    <Bell className="h-6 w-6 text-white" />
                    {email && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />}
                    <span className="sr-only">Novo email</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="bg-gradient-to-br from-indigo-950 to-purple-950">
                <DialogHeader>
                    <DialogTitle className="text-white">Novo email recebido</DialogTitle>
                    <DialogDescription className="text-gray-300">
                        {email ? (
                            <>
                                Você recebeu um email de <strong>{email.sender}</strong> com o assunto{" "}
                                <strong>{email.subject}</strong>.
                            </>
                        ) : (
                            "Não há novos emails."
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
