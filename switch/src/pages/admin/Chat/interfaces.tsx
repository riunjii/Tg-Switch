export type UserStatus = 'online' | 'ocupado' | 'ausente' | 'offline'

export interface SidebarChatProps {
    conversations: Conversation[];
    onSelectConversation: (conversation: Conversation) => void;
    selectedConversation: Conversation | null;
}

export interface User {
    id: string;
    name: string;
    avatar: string;
    status: UserStatus;
}

export interface Message {
    id: string;
    userId: string;
    content: string;
    timestamp: Date;
}

export interface Conversation {
    id: string;
    users: User[];
    lastMessage: Message;
}

