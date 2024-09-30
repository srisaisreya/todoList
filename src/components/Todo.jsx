
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

const Todo = ({ task, deleteTodo, editTodo, markAsDone }) => {
  return (
    <div className='flex justify-between items-center bg-pink-100 text-black py-3 px-4 rounded-md mb-1 cursor-pointer'>
      <p className={`font-primary ${task.isDone ? 'line-through' : ''}`}>{task.task}</p>
      <div className='flex items-center gap-x-4'>
        <AiFillEdit className='text-xl text-black' onClick={() => editTodo(task.id)} />
        <BsFillTrashFill className='text-xl text-black' onClick={() => deleteTodo(task.id)} />
        {!task.isDone && <button className='text-blackl text-xl' onClick={() => markAsDone(task.id)}>Done</button>}
      </div>
    </div>
  );
};

export default Todo;
