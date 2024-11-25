import { Conversation, Message, User } from "@/pages/admin/Chat/interfaces"

export const users: User[] = [
    { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', status: 'online' },
    { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', status: 'ocupado' },
    { id: '3', name: 'Charlie Brown', avatar: '/placeholder.svg?height=40&width=40', status: 'ausente' },
    { id: '4', name: 'David Lee', avatar: '/placeholder.svg?height=40&width=40', status: 'offline' },
]

export const initialConversations: Conversation[] = [
    { id: '1', users: [users[0], users[1]], lastMessage: { id: '1', userId: '1', content: 'Ei, como você está?', timestamp: new Date() } },
    { id: '2', users: [users[0], users[2]], lastMessage: { id: '2', userId: '2', content: 'Podemos nos encontrar amanhã?', timestamp: new Date() } },
    { id: '3', users: [users[0], users[3]], lastMessage: { id: '3', userId: '3', content: 'Eu enviei o relatório.', timestamp: new Date() } },
];

export const initialMessages: Message[] = [
    { id: '1', userId: '1', content: 'Ei, como você está?', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: '2', userId: '2', content: 'Estou bem, obrigado! E você?', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
    { id: '3', userId: '1', content: 'Estou bem. Você viu a última atualização do projeto?', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
    { id: '4', userId: '2', content: 'Sim, eu vi. Está ótimo!', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
    { id: '5', userId: '1', content: 'Que bom que acha isso. Vamos discutir isso na nossa próxima reunião.', timestamp: new Date(Date.now() - 1000 * 60 * 1) },
];
