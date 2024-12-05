import { RefreshCw } from 'lucide-react'

export const Logo = () => {
    return (
        <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl font-bold text-white">Switch</span>
            <RefreshCw className="h-8 w-8 text-indigo-600" />
        </div>
    )
}

