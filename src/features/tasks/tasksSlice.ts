import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from './types';

interface TasksState {
    tasks: Task[];
    filter: 'all' | 'completed' | 'active';
    editingTaskId: string | null;
}

// load all tasks
const loadTasks = (): Task[] => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
}

const initialState: TasksState = {
    tasks: loadTasks(),
    filter: 'all',
    editingTaskId: null
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            const newTask: Task = {
                id: Date.now().toString(),
                text: action.payload,
                completed: false
            };
            state.tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                localStorage.setItem("tasks", JSON.stringify(state.tasks));
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem("tasks", JSON.stringify(state.tasks));
        },
        setFilter: (state, action: PayloadAction<'all' | 'completed' | 'active'>) => {
            state.filter = action.payload;
        },
        startEditing: (state, action: PayloadAction<string>) => {
            state.editingTaskId = action.payload;
        },
        cancelEditing: (state) => {
            state.editingTaskId = null;
        },
        saveTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
            state.editingTaskId = null;
        }
    }
});

export const { addTask, toggleTask, deleteTask, setFilter, startEditing, cancelEditing, saveTask } = tasksSlice.actions;
export default tasksSlice.reducer;