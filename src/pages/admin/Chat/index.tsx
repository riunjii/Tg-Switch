
import { useState } from 'react'
import { ArrowLeft, Send, Paperclip, MoreVertical, RefreshCw } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarChat } from './sidebar-chat'
import { Conversation, Message } from './interfaces'
import { initialConversations, initialMessages } from '@/mocks/ChatMock'
import { getStatusColor } from '@/utils/getStatusColor'
import { Link } from 'react-router-dom'
import { Chats } from 'phosphor-react'

export const Chat = () => {
    const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
    const [messages, setMessages] = useState<Message[]>(initialMessages)
    const [newMessage, setNewMessage] = useState('')

    const handleSendMessage = () => {
        if (newMessage.trim() !== '' && selectedConversation) {
            const newMsg: Message = {
                id: String(messages.length + 1),
                userId: '1',
                content: newMessage,
                timestamp: new Date(),
            }
            setMessages([...messages, newMsg])
            setNewMessage('')

            const updatedConversations = conversations.map(conv =>
                conv.id === selectedConversation.id
                    ? { ...conv, lastMessage: newMsg }
                    : conv
            )
            setConversations(updatedConversations)
        }
    }


    return (
        <div className="flex h-screen bg-gradient-to-br from-indigo-950 to-purple-950">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="absolute top-2 left-2 md:hidden z-10">
                        <MoreVertical className="h-8 w-8 text-white" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:max-w-[400px] p-0">
                    <SidebarChat
                        conversations={conversations}
                        onSelectConversation={setSelectedConversation}
                        selectedConversation={selectedConversation}
                    />
                </SheetContent>
            </Sheet>



            <aside className="hidden md:flex md:flex-col md:w-64 bg-gradient-to-br from-indigo-950 to-purple-950 border-r  border-purple-500">
                <SidebarChat
                    conversations={conversations}
                    onSelectConversation={setSelectedConversation}
                    selectedConversation={selectedConversation}
                />
            </aside>

            <main className="flex-1 flex flex-col ">
                <header className={`bg-gradient-to-br from-indigo-950 to-purple-950 border-b border-purple-500 ${selectedConversation ? "p-[12px]" : "p-[14px]"}  flex items-center justify-between`}>
                    <div className={`'h-6' ${selectedConversation ? "hidden" : ""}`}>
                        <Link to="/app/home" className={`hidden text-white ${selectedConversation ? "hidden" : ""}`}>
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                    </div>
                    {selectedConversation && (
                        <div className="flex items-center ml-10 md:ml-0">

                            <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={selectedConversation.users[1].avatar} alt={selectedConversation.users[1].name} />
                                <AvatarFallback>{selectedConversation.users[1].name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-semibold text-white">{selectedConversation.users[1].name}</h2>
                                <div className="flex items-center">
                                    <div className={`h-2 w-2 rounded-full mr-2 ${getStatusColor(selectedConversation.users[1].status)}`}></div>
                                    <span className="text-sm text-gray-500 capitalize">{selectedConversation.users[1].status}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="hidden md:flex items-center gap-4 ">
                        <RefreshCw className="w-8 h-8 text-indigo-300" />
                        <span className="text-4xl font-bold text-white tracking-wider">SWITCH</span>
                    </div>
                </header>
                <ScrollArea className="flex-1 p-4">
                    {selectedConversation ? (
                        messages.map((message) => (
                            <div key={message.id} className={`flex mb-4 ${message.userId === '1' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`rounded-lg p-3 max-w-xs ${message.userId === '1' ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}>
                                    <p>{message.content}</p>
                                    <span className="text-xs opacity-75 mt-1 block">
                                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex justify-center items-center flex-col mt-24 opacity-60'>
                            <Chats className='text-purple-600 w-16 h-16' />
                            <p className='text-white font-semibold'>Página de conversas entre colaboradores</p>
                        </div>
                    )}
                </ScrollArea>

                <footer className="bg-gradient-to-br from-indigo-950 to-purple-950 border-t border-purple-500 p-[10px]">
                    <div className="flex items-center">
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onClick={() => handleSendMessage()}
                            className="flex-1 mr-2 text-white border-purple-500"
                        />
                        <Button variant="ghost" size="icon" className="text-white">
                            <Paperclip className="h-5 w-5" />
                        </Button>
                        <Button onClick={handleSendMessage}>
                            <Send className="h-5 w-5 mr-2" />
                            Enviar
                        </Button>
                    </div>
                </footer>
            </main>
        </div>
    )
}