import { useState } from 'preact/hooks'
import React from 'react'

const Form = ({createTodo}) => {
    const [value,setValue] = useState('')

    const handleSubmit= e =>{
        // in handle submit we take content from input feild and add it to the to do list 
        // to avoid page reload 
        e.preventDefault()
        //we are passing the input text to the todo 
        createTodo(value)
        setValue('')
    }
  return (
    <form className='mb-4 font-primary w-full' onSubmit={handleSubmit}>
        <input type='text' className='outline-none bg-transparent border border-gray-500 py-4 px-4 w-300px text-white mb-8 placeholder:text-gray-300' style="width:18rem" placeholder='What task do you have for the day?' onChange={(e)=>{setValue(e.target.value)}} value={value}/>
        <button className='bg-white border-none p-2 text-black cursor-pointer rounded ml-2'>Add Task </button>


    </form>
  )
}

export default Form
