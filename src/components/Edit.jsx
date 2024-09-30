

import { useState, useEffect } from 'react';
import React from 'react';

const Edit = ({ editTodo, task }) => {
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(task.task);
    }, [task]);

    const handleSubmit = e => {
        e.preventDefault();
        editTodo(value, task.id);
        setValue('');
    };

    return (
        <form className='mb-4 w-full' onSubmit={handleSubmit}>
            <input 
                type='text' 
                className='outline-none bg-transparent border border-gray-500 py-4 px-4 w-300px text-white mb-8 placeholder:text-gray-400' 
                style={{ width: '18rem' }} 
                placeholder='Update Task' 
                onChange={(e) => setValue(e.target.value)} 
                value={value} 
            />
            <button className='bg-pink-500 border-none p-2 text-white cursor-pointer rounded ml-2'>Update Task</button>
        </form>
    );
};

export default Edit;
