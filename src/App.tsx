import TaskForm from './features/tasks/TaskForm';
import TaskList from './features/tasks/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-indigo-100 py-8 flex items-center flex-col">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
      <div className='bg-gray-200 w-fit p-5 shadow-2xl rounded-xl'>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;