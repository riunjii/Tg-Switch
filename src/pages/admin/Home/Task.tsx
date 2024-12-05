import { useEffect, useState, useMemo } from 'react';
import { db } from '@/database/database';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2 } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Done';
}

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({ title: '', description: '', status: 'To Do' });
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<Task['status'] | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const querySnapshot = await getDocs(collection(db, 'tasks'));
            const fetchedTasks: Task[] = querySnapshot.docs.map(doc => ({
                id: doc.id as unknown as number,
                ...doc.data(),
            } as Task));
            setTasks(fetchedTasks);
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        if (newTask.title) {
            const docRef = await addDoc(collection(db, 'tasks'), newTask);
            setTasks([...tasks, { ...newTask, id: docRef.id as unknown as number }]);
            setNewTask({ title: '', description: '', status: 'To Do' });
            setIsCreateModalOpen(false);
        }
    };

    const handleEditTask = async () => {
        if (editingTask) {
            const taskDoc = doc(db, 'tasks', editingTask.id.toString());
            await updateDoc(taskDoc, {
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
            });
            setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
            setEditingTask(null);
            setIsViewModalOpen(false);
        }
    };

    const handleDeleteTask = async (id: number) => {
        const taskDoc = doc(db, 'tasks', id.toString());
        await deleteDoc(taskDoc);
        setTasks(tasks.filter(task => task.id !== id));
        setIsViewModalOpen(false);
    };

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
            const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [tasks, filterStatus, searchTerm]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-white">Tarefas</h2>
            <div className="mb-4 flex gap-4">
                <Input
                    placeholder="Pesquisar tarefa..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow text-white"
                />
                <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Task['status'] | 'All')}>
                    <SelectTrigger className="w-[180px] text-white">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className='bg-purple-900 text-white'>
                        <SelectItem value="All">Todas</SelectItem>
                        <SelectItem value="To Do">Pendente</SelectItem>
                        <SelectItem value="In Progress">Em progresso</SelectItem>
                        <SelectItem value="Done">Finalizada</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                    <Button className="mb-4">Criar nova tarefa</Button>
                </DialogTrigger>
                <DialogContent className='bg-purple-900 text-white'>
                    <DialogHeader>
                        <DialogTitle>Criar nova tarefa</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Título"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Descrição"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="mb-2"
                    />
                    <Select
                        value={newTask.status}
                        onValueChange={(value) => setNewTask({ ...newTask, status: value as Task['status'] })}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className='bg-purple-950 text-white'>
                            <SelectItem value="To Do">Pendente</SelectItem>
                            <SelectItem value="In Progress">Em progresso</SelectItem>
                            <SelectItem value="Done">Finalizada</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleCreateTask}>Criar tarefa</Button>
                </DialogContent>
            </Dialog>
            {filteredTasks.map((task) => (
                <div key={task.id} className="mb-4 p-4 bg-white bg-opacity-10 rounded-lg flex justify-between items-start">
                    <div
                        className="cursor-pointer flex-grow"
                        onClick={() => {
                            setEditingTask(task);
                            setIsViewModalOpen(true);
                        }}
                    >
                        <h3 className={`font-semibold text-white ${task.status === 'Done' ? 'line-through' : ''}`}>{task.title}</h3>
                        <p className={`text-sm text-gray-300 ${task.status === 'Done' ? 'line-through' : ''}`}>{task.description}</p>
                        <span className="text-xs text-blue-400">{task.status}</span>
                    </div>
                    <div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className='text-white hover:text-purple-700'
                            onClick={() => {
                                setEditingTask(task);
                                setIsViewModalOpen(true);
                            }}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className='text-white hover:text-purple-700'
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            <Trash2 className="h-4 w-4 text-white" />
                        </Button>
                    </div>
                </div>
            ))}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className='bg-purple-900 text-white'>
                    <DialogHeader>
                        <DialogTitle>{editingTask ? 'Editar' : 'Visualizar'}</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Título"
                        value={editingTask?.title || ''}
                        onChange={(e) => setEditingTask(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="mb-2"
                    />
                    <Textarea
                        placeholder="Descrição"
                        value={editingTask?.description || ''}
                        onChange={(e) => setEditingTask(prev => prev ? { ...prev, description: e.target.value } : null)}
                        className="mb-2"
                    />
                    <Select
                        value={editingTask?.status}
                        onValueChange={(value) => setEditingTask(prev => prev ? { ...prev, status: value as Task['status'] } : null)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className='bg-purple-950 text-white'>
                            <SelectItem value="To Do">Pendente</SelectItem>
                            <SelectItem value="In Progress">Em progresso</SelectItem>
                            <SelectItem value="Done">Finalizada</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={handleEditTask}>Salvar</Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}
