import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Header } from './header'
import { Sidebar } from './sidebar'
import { EmailContent } from './email-content'

const emails = [
    { id: 1, subject: 'Bem-vindo ao Switch', sender: 'equipe@switch.com', preview: 'Obrigado por se juntar ao Switch...' },
    { id: 2, subject: 'Resumo da sua conta', sender: 'noreply@switch.com', preview: 'Aqui está um resumo de sua atividade recente...' },
    { id: 3, subject: 'Anúncio de nova funcionalidade', sender: 'produto@switch.com', preview: 'Estamos animados para anunciar nossa última funcionalidade...' },
];


export const EmailPage = () => {
    const [selectedEmail, setSelectedEmail] = useState(emails[0])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-950">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:w-80 flex-shrink-0`}>
                    <Sidebar emails={emails} onSelectEmail={(email) => {
                        setSelectedEmail(email)
                        setSidebarOpen(false)
                    }} />
                </div>
                <div className="flex-grow flex flex-col">
                    <div className="p-4 md:hidden">
                        <Button className='bg-purple-900 text-white' variant="outline" onClick={toggleSidebar}>
                            <Menu className="h-8 w-8 mr-2" />
                        </Button>
                    </div>
                    <EmailContent email={selectedEmail} />
                </div>
            </div>
        </div>
    )
}
