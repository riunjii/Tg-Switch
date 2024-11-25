import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"
import { SidebarChatProps } from "./interfaces"
import { getStatusColor } from "@/utils/getStatusColor"
import { Link } from "react-router-dom"



export const SidebarChat = ({ conversations, onSelectConversation, selectedConversation }: SidebarChatProps) => {

    return (
        <>
            <div className="p-4 border-b border-purple-500 bg-gradient-to-br from-indigo-950 to-purple-950">
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-500" />
                    <Input type="text" placeholder="Search" className="pl-8 max-w-[80%] md:max-w-[100%] border-purple-500" />
                </div>
            </div>
            <ScrollArea className="flex flex-col justify-between bg-gradient-to-br from-indigo-950 to-purple-950 h-full relative">
                <div>
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className={`p-4 cursor-pointer hover:bg-purple-950 ${selectedConversation?.id === conversation.id ? 'bg-purple-950' : ''
                                }`}
                            onClick={() => onSelectConversation(conversation)}
                        >
                            <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                    <AvatarImage src={conversation.users[1].avatar} alt={conversation.users[1].name} />
                                    <AvatarFallback>{conversation.users[1].name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold truncate text-white">{conversation.users[1].name}</h3>
                                    <p className="text-sm text-gray-500 truncate">
                                        {conversation.lastMessage.content.length > 16
                                            ? conversation.lastMessage.content.slice(0, 16) + '...'
                                            : conversation.lastMessage.content}
                                    </p>
                                </div>
                                <div className="ml-2">
                                    <div className={`h-2 w-2 rounded-full ${getStatusColor(conversation.users[1].status)}`}></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Link to="/app/home" className="absolute bottom-0 left-0 w-full p-4 text-center text-white bg-gradient-to-t from-purple-900 to-transparent border-t border-purple-400">
                    Home
                </Link>
            </ScrollArea>
        </>
    )
}