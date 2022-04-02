import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from 'react';
import { api } from '../../api';

export interface TaskContextData {
  tasks: Task[];
  newTaskTitle: string;
  setNewTaskTitle: (title: string) => void;
  handleCreateNewTask: () => void;
  handleDeleteTask: (id: string) => void;
  handleSetTaskAsCompleted: (id: string, completed: boolean) => void;
}

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export const TaskContext = createContext<TaskContextData>(
    {} as TaskContextData,
);

const TaskProvider: React.FC = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleCreateNewTask = () => {
        api.post('/todos', {
            title: newTaskTitle,
            completed: false,
        }).then(response => {
            setTasks([...tasks, response.data]);
            setNewTaskTitle('');
        })
    }

    const handleSetTaskAsCompleted = (id: string, completed: boolean) => {
        api.patch(`/todos/${id}`, {
            completed: !completed,
        }).then(response => {
            setTasks(tasks.map(task => task.id === id ? response.data : task));
        })
    }

    const handleDeleteTask = (id: string) => {
        api.delete(`/todos/${id}`).then(() => {
            setTasks(tasks.filter(task => task.id !== id));
        })
    }

    useEffect(() => {
        api.get('/todos').then(response => { 
            setTasks(response.data);  
        })
    }, []);

  return (
        <TaskContext.Provider
          value={{
            tasks,
            newTaskTitle,
            setNewTaskTitle,
            handleCreateNewTask,
            handleDeleteTask,
            handleSetTaskAsCompleted,
          }}
        >
            {children}
        </TaskContext.Provider>
  );
};

function useTask(): TaskContextData {
    const context = useContext(TaskContext);
  
    return context;
}
  
export { TaskProvider, useTask };

