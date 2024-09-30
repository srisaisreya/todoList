import { useState } from 'preact/hooks';
import './app.css'; // Ensure Tailwind CSS is imported here
import TodoList from './components/TodoList';

export function App() {
  return (
    <div className="main-container flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-gray-100 hover:from-pink-400 hover:via-purple-400 hover:to-gray-200 transition duration-300">
      <TodoList />
    </div>
  );
}
