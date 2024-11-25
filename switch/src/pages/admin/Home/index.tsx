import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

export const Home = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, title: "Novo e-mail recebido", description: "Você tem um novo e-mail de João Silva" },//+
        { id: 2, title: "Lembrete de reunião", description: "Reunião de equipe em 30 minutos" },//+
        { id: 3, title: "Tarefa concluída", description: "O Projeto X foi marcado como concluído" },//+
        { id: 4, title: "Atualização do sistema", description: "Uma nova atualização do sistema está disponível" },//+
        { id: 5, title: "Nova mensagem de chat", description: "Você tem uma nova mensagem no chat do projeto" },//+
    ])


    return (
        <div className="flex flex-col h-screen ">
            <Header />

            <div className="flex flex-1 overflow-hidden ">
                <Sidebar />

                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-950 to-indigo-950 p-4">
                    <div className="max-w-7xl mx-auto ">
                        <div className="flex flex-col items-center justify-center mb-8">
                            <figure className=" p-4 sm:p-6 rounded-full shadow-md">
                                <Avatar className="w-18 h-18">
                                    <AvatarImage src="https://static.vecteezy.com/ti/vetor-gratis/p1/19073761-unidade-de-logotipo-da-matriz-logotipo-do-nome-da-empresa-ficticia-da-matriz-gratis-vetor.jpg" alt="Company Logo" className="w-16" />
                                    <AvatarFallback>Logo da empresa</AvatarFallback>
                                </Avatar>
                            </figure>
                            <span className="text-2xl text-white font-bold">Matrix LTDA</span>
                        </div>
                        <div className="flex justify-between items-center">

                            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">Notificações</h2>
                            <div className="flex gap-3 text-lg font-semibold text-purple-400">
                                <a href="#">Calendário</a>
                                <a href="#">Anotações</a>
                                <a href="#">Tarefas</a>
                            </div>
                        </div>
                        <ScrollArea className="h-[calc(100vh-300px)] rounded-md border border-purple-500">
                            {notifications.map((notification, index) => (
                                <div key={notification.id}>
                                    <div className="p-4">
                                        <h3 className="text-base sm:text-lg font-medium text-white">{notification.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-300">{notification.description}</p>
                                        <Button variant="ghost" size="sm" className="mt-2 text-xs sm:text-sm text-primary">
                                            Visualizar <ChevronRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                    </div>
                                    {index < notifications.length - 1 && <Separator className="bg-purple-500" />}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                </main>
            </div>
        </div>
    )
}
