import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { cancelEditing, saveTask } from './tasksSlice';
import type { Task } from './types';

interface EditTaskFormProps {
    task: Task;
}

const EditTaskForm = ({ task }: EditTaskFormProps) => {
    const dispatch = useAppDispatch();
    const [editedText, setEditedText] = useState(task.text);

    useEffect(() => {
        setEditedText(task.text);
    }, [task.text]);

    const handleSave = () => {
        if (editedText.trim()) {
            dispatch(saveTask({ id: task.id, text: editedText }));
        }
    };

    return (
        <div className="flex items-center w-full">
            <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="flex-1 px-2 py-1 border rounded mr-2"
                autoFocus
            />
            <button
                onClick={handleSave}
                className="px-2 py-1 bg-green-500 text-white rounded mr-2 hover:bg-green-600"
            >
                Save
            </button>
            <button
                onClick={() => dispatch(cancelEditing())}
                className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
                Cancel
            </button>
        </div>
    );
};

export default EditTaskForm;