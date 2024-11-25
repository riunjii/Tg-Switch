import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

export const Notification = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" className=" border-none relative bg-gradient-to-br from-indigo-950 to-purple-950">
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
                    <span className="sr-only">Novo email</span>
                </Button>
            </DialogTrigger>
            <DialogContent className='bg-gradient-to-br from-indigo-950 to-purple-950'>
                <DialogHeader>
                    <DialogTitle className='text-white'>Novo email recebido</DialogTitle>
                    <DialogDescription className='text-gray-300'>
                        Você possui um email de marketing@example.com com a mensagem de "tempo limite da oferta"
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

