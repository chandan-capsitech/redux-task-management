import { useAppSelector, useAppDispatch } from '../../app/hooks';
import EditTaskForm from './EditTaskForm';
import { toggleTask, deleteTask, setFilter, startEditing } from './tasksSlice';

const TaskList = () => {
    const dispatch = useAppDispatch();
    const { tasks, filter, editingTaskId } = useAppSelector(state => state.tasks);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        return !task.completed;
    });

    return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-xl shadow-lg">
            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => dispatch(setFilter('all'))}
                    className={`px-4 py-2 ${filter === 'all' ? 'bg-indigo-300 text-white' : 'bg-gray-200'} font-medium rounded-md hover:bg-indigo-200`}
                >
                    All
                </button>
                <button
                    onClick={() => dispatch(setFilter('active'))}
                    className={`px-4 py-2 ${filter === 'active' ? 'bg-indigo-300 text-white' : 'bg-gray-200'} font-medium rounded-md hover:bg-indigo-200`}
                >
                    Active
                </button>
                <button
                    onClick={() => dispatch(setFilter('completed'))}
                    className={`px-4 py-2 ${filter === 'completed' ? 'bg-indigo-300 text-white' : 'bg-gray-200'} font-medium rounded-md hover:bg-indigo-200`}
                >
                    Completed
                </button>
            </div>  
            <ul className="space-y-2">
                {filteredTasks.map(task => (
                    <li key={task.id} className="flex items-center justify-between p-2 border rounded">
                        {editingTaskId === task.id ? (<EditTaskForm task={task} />) : (
                            <>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => dispatch(toggleTask(task.id))}
                                        className="mr-2"
                                    />
                                    <span className={task.completed ? 'line-through text-gray-400' : ''}>
                                        {task.text}
                                    </span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => dispatch(startEditing(task.id))}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => dispatch(deleteTask(task.id))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;