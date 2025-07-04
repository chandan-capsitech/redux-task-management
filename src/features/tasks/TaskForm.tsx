import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTask } from './tasksSlice';

const TaskForm = () => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTask(text));
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4 shadow-lg">
            <div className="flex">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 border rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-2xl hover:bg-blue-600 cursor-pointer"
                >
                    Add
                </button>
            </div>
        </form>
    );
};

export default TaskForm;