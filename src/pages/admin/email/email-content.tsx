import { ScrollArea } from "@/components/ui/scroll-area";

interface Email {
    id: string;
    subject: string;
    sender: string;
    message: string;
    preview: string;
    body?: string;
}

interface EmailContentProps {
    email: Email;
}

export const EmailContent = ({ email }: EmailContentProps) => {

    return (
        <div className="flex-1 p-4 overflow-hidden">
            <ScrollArea className="h-full">
                <h2 className="text-2xl font-bold mb-2 text-gray-300">
                    {email.subject}
                </h2>
                <p className="text-muted-foreground mb-4 text-gray-300">
                    De: {email.sender}
                </p>
                <div className="prose max-w-none text-gray-300 break-words whitespace-pre-wrap">
                    <p className="overflow-wrap-anywhere">{email.message}</p>
                </div>
            </ScrollArea>
        </div>
    );
};
