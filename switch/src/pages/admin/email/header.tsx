import { ArrowLeft, RefreshCcw } from 'lucide-react'
import { Notification } from './notification'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 border-b border-purple-500">
            <Link to="/app/home">
                <ArrowLeft className="h-6 w-6 text-white" />
                <span className="sr-only">Go back</span>
            </Link>
            <div className="flex items-center space-x-2">
                <RefreshCcw className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold text-white">Switch</span>
            </div>
            <Notification />
        </header>
    )
}

