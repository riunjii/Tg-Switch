import { UserStatus } from "@/pages/admin/Chat/interfaces"

export const getStatusColor = (status: UserStatus): string => {
    switch (status) {
        case 'online': return 'bg-green-500'
        case 'ocupado': return 'bg-red-500'
        case 'ausente': return 'bg-yellow-500'
        case 'offline': return 'bg-gray-500'
        default: return 'bg-gray-500'
    }
}