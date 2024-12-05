import { RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

export const NotFound = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    function handleNavigateToHome() {
        if (user) {
            navigate('/app/home')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-950 to-purple-950 text-center px-4">
            <div className="mb-8">
                <h1 className="text-6xl font-bold text-white mb-2 flex items-center justify-center">
                    Switch
                    <RefreshCw className="ml-2 h-12 w-12 text-blue-500 animate-spin" />
                </h1>
                <p className="text-2xl text-center text-gray-200">Oops! Página não encontrada</p>
            </div>
            <p className="text-xl text-gray-200 mb-8">
                A página que você tentou acessar não existe!
            </p>

            <Button onClick={handleNavigateToHome} className=" text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                {user ? 'Voltar para o Início' : 'Fazer Login'}
            </Button>

        </div>
    )
}

