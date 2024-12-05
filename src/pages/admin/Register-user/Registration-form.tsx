import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "@/database/database"
import { toast } from "sonner"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"

const schema = z.object({
    name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres"),
    email: z.string().email("Insira um email válido"),
    password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres").max(30),
    role: z.enum(["admin", "empresa", "usuario"]).optional(),
})

type RegistrationFormData = z.infer<typeof schema>

export const RegistrationForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting } }
        = useForm<RegistrationFormData>({
            resolver: zodResolver(schema),
            mode: "onChange",
        })

    async function handleRegisterUser(user: RegistrationFormData) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

            await updateProfile(userCredential.user, {
                displayName: user.name,
            });

            await setDoc(doc(db, "users", userCredential.user.uid), {
                name: user.name,
                email: user.email,
                role: user.role,
            });

            toast.success("Usuário criado com sucesso!", {
                style: {
                    backgroundColor: '#14af00',
                    color: 'white',
                    fontWeight: 'bold',
                }
            })
            reset()
        } catch (error) {
            toast.error("Erro ao cadastrar o usuário", {
                style: {
                    backgroundColor: '#fa3d04',
                    color: 'white',
                    fontWeight: 'bold',
                }
            })
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegisterUser)} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <Label htmlFor="name-user" className="text-gray-100">Nome</Label>
                    <Input
                        id="name-user"
                        {...register("name")}
                        type="text"
                        placeholder="Nome"
                        className="bg-white/90 border-0"
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div>
                    <Label htmlFor="email-address" className="text-gray-100">Email</Label>
                    <Input
                        id="email-address"
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className="bg-white/90 border-0"
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>

                <div>
                    <Label htmlFor="password" className="text-gray-100">Senha</Label>
                    <Input
                        id="password"
                        {...register("password")}
                        type="password"
                        placeholder="Senha"
                        className="bg-white/90 border-0"
                    />
                    {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
            </div>

            <div>
                <Label htmlFor="role" className="text-gray-100">Tipo de usuário</Label>
                <Select onValueChange={(value) => setValue("role", value as "admin" | "empresa")}>
                    <SelectTrigger className="w-full mt-1 text-white">
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="empresa">Empresa</SelectItem>
                        <SelectItem value="usuario">Usuário</SelectItem>
                    </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

            <div className="flex flex-col gap-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {isSubmitting ? "Registrando..." : "Registrar"}
                </Button>
                <Button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center py-2 px-4 border border-purple-400 text-sm font-medium rounded-md bg-transparent"
                >
                    Voltar
                </Button>
            </div>
        </form>
    )
}
