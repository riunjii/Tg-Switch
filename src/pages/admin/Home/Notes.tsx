import { useState, useEffect, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2 } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/database/database";
import { AuthContext } from "@/context/AuthContext";

interface Note {
    id: string;
    title: string;
    description: string;
}

export function Notes() {
    const { user } = useContext(AuthContext);
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState<Omit<Note, 'id'>>({ title: '', description: '' });
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!user) return;
            const q = query(collection(db, "notes"), where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);
            const fetchedNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Note));
            setNotes(fetchedNotes);
        };
        fetchNotes();
    }, [user]);

    const handleCreateNote = async () => {
        if (newNote.title && user) {
            const docRef = await addDoc(collection(db, "notes"), {
                ...newNote,
                userId: user.uid,
                createdAt: Date.now(),
            });
            setNotes([...notes, { id: docRef.id, ...newNote }]);
            setNewNote({ title: '', description: '' });
            setIsCreateModalOpen(false);
        }
    };

    const handleEditNote = async () => {
        if (editingNote && user) {
            const noteRef = doc(db, "notes", editingNote.id);
            await updateDoc(noteRef, {
                title: editingNote.title,
                description: editingNote.description,
            });
            setNotes(notes.map(note => (note.id === editingNote.id ? editingNote : note)));
            setEditingNote(null);
            setIsViewModalOpen(false);
        }
    };

    const handleDeleteNote = async (id: string) => {
        await deleteDoc(doc(db, "notes", id));
        setNotes(notes.filter(note => note.id !== id));
        setIsViewModalOpen(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Anotações</h2>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4 text-white">Criar nova nota</Button>
                </DialogTrigger>
                <DialogContent className="bg-purple-950 text-white">
                    <DialogHeader>
                        <DialogTitle>Criar nova nota</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Título"
                        value={newNote.title}
                        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Descrição"
                        value={newNote.description}
                        onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                        className="mb-2"
                    />
                    <Button onClick={handleCreateNote}>Criar nota</Button>
                </DialogContent>
            </Dialog>
            {notes.map((note) => (
                <div key={note.id} className="mb-4 p-4 bg-white bg-opacity-10 rounded-lg flex justify-between items-start">
                    <div
                        className="cursor-pointer flex-grow"
                        onClick={() => {
                            setEditingNote(note);
                            setIsViewModalOpen(true);
                        }}
                    >
                        <h3 className="font-semibold text-white">{note.title}</h3>
                        <p className="text-sm text-gray-300">{note.description}</p>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            className="text-white hover:text-purple-700"
                            size="icon"
                            onClick={() => {
                                setEditingNote(note);
                                setIsViewModalOpen(true);
                            }}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            className="text-white hover:text-purple-700"
                            size="icon"
                            onClick={() => handleDeleteNote(note.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className='bg-purple-900 text-white'>
                    <DialogHeader>
                        <DialogTitle>{editingNote ? 'Editar' : 'Visualizar'}</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Título"
                        value={editingNote?.title || ''}
                        onChange={(e) =>
                            setEditingNote((prev) => (prev ? { ...prev, title: e.target.value } : null))
                        }
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Descrição"
                        value={editingNote?.description || ''}
                        onChange={(e) =>
                            setEditingNote((prev) => (prev ? { ...prev, description: e.target.value } : null))
                        }
                        className="mb-2"
                    />
                    <Button onClick={handleEditNote}>Salvar</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
