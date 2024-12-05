import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import * as z from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/database/database'
import { getAuth } from 'firebase/auth'

export const emailSchema = z.object({
    to: z.string().email("Email inválido"),
    subject: z.string().min(1, "Adicione o Assunto para continuar"),
    message: z.string().min(1, "Escreva sua mensagem para continuar"),
});

type EmailMessage = z.infer<typeof emailSchema>
export const ComposeEmail = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<EmailMessage>({
        resolver: zodResolver(emailSchema),
    });


    const handleEmailSubmit = async ({ to, subject, message }: EmailMessage) => {
        try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                toast.error("Usuário não autenticado. Faça login para enviar emails.");
                return;
            }

            const senderEmail = currentUser.email;
            if (!senderEmail) {
                toast.error("Erro ao identificar o remetente.");
                return;
            }

            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", to));
            const querySnapshot = await getDocs(q);

            let recipientId: string;

            if (querySnapshot.empty) {
                const recipientDoc = await addDoc(usersRef, { email: to, createdAt: new Date() });
                recipientId = recipientDoc.id;
            } else {
                recipientId = querySnapshot.docs[0].id;
            }

            const inboxRef = collection(db, `users/${recipientId}/inbox`);
            await addDoc(inboxRef, {
                subject,
                message,
                sender: senderEmail,
                timestamp: new Date(),
            });

            toast.success("Email enviado com sucesso!");
            reset();
        } catch (error) {
            console.error("Erro ao enviar email:", error);
            toast.error("Erro ao enviar o email. Tente novamente.");
        }
    };


    return (
        <form onSubmit={handleSubmit(handleEmailSubmit)} className="space-y-4 p-4">
            <div>
                <Label className="text-white" htmlFor="to">Para</Label>
                <Input
                    id="to"
                    type="email"
                    placeholder="destinatario@example.com"
                    {...register("to")}
                    className="text-white"
                />
                {errors.to && <p className="text-red-500">{errors.to.message}</p>}
            </div>
            <div>
                <Label className="text-white" htmlFor="subject">Assunto</Label>
                <Input
                    id="subject"
                    type="text"
                    placeholder="Assunto do email"
                    {...register("subject")}
                    className="text-white"
                />
                {errors.subject && <p className="text-red-500">{errors.subject.message}</p>}
            </div>
            <div>
                <Label className="text-white" htmlFor="message">Mensagem</Label>
                <Textarea
                    id="message"
                    placeholder="Digite sua mensagem"
                    {...register("message")}
                    className="h-32 text-white"
                />
                {errors.message && <p className="text-red-500">{errors.message?.message}</p>}
            </div>
            <Button className="w-24" type="submit">{isSubmitting ? 'Enviando...' : 'Enviar'}</Button>
        </form>
    );
};

