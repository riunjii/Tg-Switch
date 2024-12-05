import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Plus, RefreshCcw, X } from "lucide-react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { EmailContent } from "./email-content";
import { collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/database/database";
import { ComposeEmail } from "./compose-email";

export interface EmailProps {
    id: string;
    subject: string;
    sender: string;
    preview: string;
    message: string;
    body?: string;
}

export const EmailPage = () => {
    const [emails, setEmails] = useState<EmailProps[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<EmailProps | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [composing, setComposing] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [newEmail, setNewEmail] = useState<EmailProps | null>(null);

    const toggleCompose = () => setComposing(!composing);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const inboxRef = collection(db, `users/${user.uid}/inbox`);
            const unsubscribe = onSnapshot(inboxRef, (snapshot) => {
                const emailsData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as EmailProps[];

                if (emailsData.length > emails.length) {
                    const latestEmail = emailsData[0];
                    setNewEmail(latestEmail);
                }

                setEmails(emailsData);
                if (!selectedEmail && emailsData.length > 0) {
                    setSelectedEmail(emailsData[0]);
                }
            });

            if (refresh) {
                setRefresh(false);
            }

            return () => unsubscribe();
        }
    }, [refresh, selectedEmail]);

    function handleRefreshEmails() {
        setRefresh(true);
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-950 to-purple-950">
            <Header newEmail={newEmail} />
            <div className="flex flex-1 overflow-hidden">
                <div
                    className={`${sidebarOpen ? "block" : "hidden"
                        } md:block md:w-80 flex-shrink-0`}
                >
                    <Sidebar
                        emails={emails}
                        onSelectEmail={(email) => {
                            setSelectedEmail(email as EmailProps);
                            setSidebarOpen(false);
                        }}
                    />
                </div>
                <div className="flex-grow flex flex-col">
                    <div className="p-4 md:hidden">
                        <Button
                            className="bg-purple-900 text-white"
                            variant="outline"
                            onClick={toggleSidebar}
                        >
                            <Menu className="h-8 w-8 mr-2" />
                        </Button>
                    </div>
                    <div className="flex gap-2 items-center">
                        <Button className="mb-6 mt-4 ml-4 w-[130px]" onClick={toggleCompose}>
                            {composing ? (
                                <>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancelar
                                </>
                            ) : (
                                <>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Novo email
                                </>
                            )}
                        </Button>
                        <Button className="mb-6 mt-4 ml-4 w-[130px]" onClick={handleRefreshEmails}>
                            <RefreshCcw className="h-4 w-4" />
                        </Button>
                    </div>

                    {composing ? <ComposeEmail /> : selectedEmail && <EmailContent email={selectedEmail} />}
                </div>
            </div>
        </div>
    );
};
