import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { auth } from "@/database/database"

import { zodResolver } from "@hookform/resolvers/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { RefreshCw } from "lucide-react"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from 'zod'

const signInProps = z.object({
    email: z.string().email("Insira um email válido"),
    password: z.string().min(8, "A senha deve conter no míinimo 8 caracteres").max(30),
})

type SignInForm = z.infer<typeof signInProps>

export const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<SignInForm>({
        resolver: zodResolver(signInProps)
    });

    const handleNavigateToSignUp = () => {
        navigate("/app/home")
    }

    async function handleLogin(user: SignInForm) {
        try {
            await signInWithEmailAndPassword(auth, user.email, user.password)
            toast.success("Login realizado com sucesso!")
            handleNavigateToSignUp()
        } catch (error) {
            toast.error("Falha ao realizar o login. Verifique suas credenciais.")
        }

    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 to-purple-950 flex items-center justify-center p-4">
            <main className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">

                <div className="flex flex-col items-center justify-center lg:justify-end space-y-4">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-indigo-300 rounded-full" />
                        <div className="absolute inset-2 border-4 border-indigo-300 rounded-full" />
                        <div className="absolute inset-4 border-4 border-indigo-300 rounded-full" />
                        <RefreshCw className="w-16 h-16 text-indigo-300" />
                    </div>
                    <h1 className="text-4xl font-bold text-white tracking-wider">SWITCH</h1>
                </div>

                <form onSubmit={(event) => {
                    event.preventDefault();
                    handleSubmit(handleLogin)(event);
                }} className="bg-indigo-900/30 backdrop-blur-sm rounded-lg p-8 lg:p-12">
                    <div className="space-y-6 max-w-md mx-auto">
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-semibold text-white">LOGIN</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <Input
                                    className="bg-white/90 border-0"
                                    placeholder="Email"
                                    type="email"
                                    {...register('email')}
                                />
                                {errors && (
                                    <span className="text-red-600">
                                        {errors.email?.message}
                                    </span>)}
                            </div>
                            <div>
                                <Input
                                    className="bg-white/90 border-0"
                                    placeholder="Senha"
                                    type="password"
                                    {...register('password')}
                                />
                                {errors && (
                                    <span className="text-red-600">
                                        {errors.password?.message}
                                    </span>)}
                            </div>
                            <Button type="submit" className="w-full text-white">
                                {isSubmitting ? 'Entrando...' : 'Entrar'}
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-indigo-300/20" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-indigo-900/30 px-2 text-indigo-300">
                                        SWITCH
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                className="w-full text-indigo-300 hover:text-indigo-200 hover:bg-indigo-900/50"
                            >
                                ESQUECI A SENHA
                            </Button>
                        </div>
                        <p className="text-center text-sm text-indigo-300">
                            Caso necessite criar uma conta, entre em contato com o TI da sua
                            empresa
                        </p>
                    </div>
                </form>
            </main>
        </div>
    )
}
