import { ScrollArea } from '@/components/ui/scroll-area'

interface Email {
    id: number
    subject: string
    sender: string
    preview: string
}

interface EmailContentProps {
    email: Email
}

export const EmailContent = ({ email }: EmailContentProps) => {
    return (
        <div className="flex-1 p-4 overflow-hidden">
            <ScrollArea className="h-full">
                <h2 className="text-2xl font-bold mb-2 text-white">{email.subject}</h2>
                <p className="text-muted-foreground mb-4 text-purple-700">From: {email.sender}</p>
                <div className="prose max-w-none text-gray-300">
                    <p>{email.preview}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div >
            </ScrollArea >
        </div >
    )
}