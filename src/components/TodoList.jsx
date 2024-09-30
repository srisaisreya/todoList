// import React, { useState, useEffect } from 'react';
// import Form from './Form';
// import Todo from './Todo';
// import Edit from './Edit';
// import ReactPaginate from 'react-paginate';
// import { v4 as uuidv4 } from 'uuid';

// const TodoList = () => {
//     // todo tasks list array
//   const [todoValue, setTodo] = useState([]);
//   // to keep track of current page and next page in the pagination
//   const [currentPage, setCurrentPage] = useState(0);
//   // the maximum number of pages for pagination
//   const todosPerPage = 5;
//   // on refresh or reload the previous state shouldn't be lost and todo list should not be displayed as empty so we fetch from localstorage
//   useEffect(() => {
//     const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
//     setTodo(savedTodos);
//   }, []);
//   // we save todo to the local storage

//   useEffect(() => {
//     localStorage.setItem('todos', JSON.stringify(todoValue));
//   }, [todoValue]);

//   // here we create a todo task if the added todo task is not empty, we add it to the previous array of todos that is todoValue array, id,task ,isEditing and isDone

// // isEditing is the edit button and the isDone is the done button 

//   const createTodo = (todo) => {
//     if (todo.trim()) {
//       setTodo([...todoValue, { id: uuidv4(), task: todo, isEditing: false, isDone: false }]);
//     }
//   };
// // deleting the task based on the matching id 
//   const deleteTodo = (id) => {
//     setTodo(todoValue.filter(todo => todo.id !== id));
//   };
// // that is on clicking the edit button we are setting the isEditing button to the different state than previous
//   const editTodo = (id) => {
//     setTodo(todoValue.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
//   };
// // here we are adding the task added in the input box after clicking edit button
//   const editTask = (task, id) => {
//     setTodo(todoValue.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
//   };
// // we are marking the isDone to true on clicking the done button 
//   const markAsDone = (id) => {
//     setTodo(todoValue.map(todo => todo.id === id ? { ...todo, isDone: true } : todo));
//   };
// // totalTasks is to get the length of the todoValue array
//   const totalTasks = todoValue.length;
//   // completedTasks is the ones marked as isDone
//   const completedTasks = todoValue.filter(todo => todo.isDone).length;
// // offset value is to measure the starting slice of the arrayv in that particular page
//   const offset = currentPage * todosPerPage;
//   // so we get 5 todos from offset to offset+todosPerpage
//   const currentTodos = todoValue.slice(offset, offset + todosPerPage);

//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   return (
//     <div className='container bg-pink-600 mt-20 p-8 rounded-md' style={{ width: '30rem' }}>
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-white text-opacity-80 font-bold text-2xl">Tasks for the day!!</h1>

//         {/* Circular progress indicator */}
//         <div className="relative flex items-center justify-center ml-4">
//           <div className="absolute inset-0 rounded-full border-4 border-white flex items-center justify-center">
//             <span className="text-white text-xl font-bold">{completedTasks}/{totalTasks}</span>
//           </div>
//           <div className={`w-16 h-16 rounded-full ${totalTasks > 0 ? 'bg-pink-500' : 'bg-gray-400'}`}></div>
//         </div>
//       </div>

//       <Form createTodo={createTodo} />
//       {todoValue.length > 0 && (
//         <div className='mt-4'>
//           {currentTodos.map((todo) =>
//             todo.isEditing ? (
//               <Edit key={todo.id} editTodo={editTask} task={todo} />
//             ) : (
//               <Todo 
//                 task={todo} 
//                 key={todo.id} 
//                 deleteTodo={deleteTodo} 
//                 editTodo={editTodo} 
//                 markAsDone={markAsDone} 
//               />
//             )
//           )}
//         </div>
//       )}

//       {todoValue.length > todosPerPage && (
//         <ReactPaginate
//           previousLabel={<span className="text-black">Previous</span>}
//           nextLabel={<span className="text-black">Next</span>}
//           pageCount={Math.ceil(todoValue.length / todosPerPage)}
//           onPageChange={handlePageClick}
//           containerClassName={'flex justify-center items-center mt-4 space-x-2'}
//           activeClassName={'bg-white text-black font-bold rounded px-3 py-1'}
//           pageClassName={'bg-gray-300 text-black rounded px-3 py-1 hover:bg-gray-400 transition duration-300'}
//           previousClassName={'bg-gray-300 text-black rounded px-3 py-1 hover:bg-gray-400 transition duration-300'}
//           nextClassName={'bg-gray-300 text-black rounded px-3 py-1 hover:bg-gray-400 transition duration-300'}
//           disabledClassName={'opacity-50 cursor-not-allowed'}
//           breakClassName={'text-black mx-2'}
//         />
//       )}
//     </div>
//   );
// };

// export default TodoList;

import React, { useState, useEffect } from 'react';
import Form from './Form';
import Todo from './Todo';
import Edit from './Edit';
import ReactPaginate from 'react-paginate';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
  const [todoValue, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const todosPerPage = 5;

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodo(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoValue));
  }, [todoValue]);

  const createTodo = (todo) => {
    if (todo.trim()) {
      const newTodos = [...todoValue, { id: uuidv4(), task: todo, isEditing: false, isDone: false }];
      setTodo(newTodos);
      
      // Automatically go to the next page if the current page is full (i.e., if this is the 6th task)
      if (newTodos.length > (currentPage + 1) * todosPerPage) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todoValue.filter(todo => todo.id !== id);
    setTodo(newTodos);
    
    // Go to the previous page if the current page becomes empty after deletion
    if (newTodos.length <= currentPage * todosPerPage && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const editTodo = (id) => {
    setTodo(todoValue.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
  };

  const editTask = (task, id) => {
    setTodo(todoValue.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
  };

  const markAsDone = (id) => {
    setTodo(todoValue.map(todo => todo.id === id ? { ...todo, isDone: true } : todo));
  };

  const totalTasks = todoValue.length;
  const completedTasks = todoValue.filter(todo => todo.isDone).length;

  const offset = currentPage * todosPerPage;
  const currentTodos = todoValue.slice(offset, offset + todosPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className='container bg-pink-700 mt-20 p-8 rounded-md' style={{ width: '30rem' }}>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-white text-opacity-75 font-bold text-2xl">Tasks for the day!!</h1>

        {/* Circular progress indicator */}
        <div className="relative flex items-center justify-center ml-4">
          <div className="absolute inset-0 rounded-full border-4 border-white flex items-center justify-center">
            <span className="text-white text-xl font-bold">{completedTasks}/{totalTasks}</span>
          </div>
          <div className={`w-16 h-16 rounded-full ${totalTasks > 0 ? 'bg-pink-500' : 'bg-gray-400'}`}></div>
        </div>
      </div>

      <Form createTodo={createTodo} />
      {todoValue.length > 0 && (
        <div className='mt-4'>
          {currentTodos.map((todo) =>
            todo.isEditing ? (
              <Edit key={todo.id} editTodo={editTask} task={todo} />
            ) : (
              <Todo 
                task={todo} 
                key={todo.id} 
                deleteTodo={deleteTodo} 
                editTodo={editTodo} 
                markAsDone={markAsDone} 
              />
            )
          )}
        </div>
      )}

      {todoValue.length > todosPerPage && (
        <ReactPaginate
          previousLabel={<span className="text-black">Previous</span>}
          nextLabel={<span className="text-black">Next</span>}
          pageCount={Math.ceil(todoValue.length / todosPerPage)}
          onPageChange={handlePageClick}
          containerClassName={'flex justify-center items-center mt-4 space-x-2'}
          activeClassName={'bg-white text-black font-bold rounded px-3 py-1'}
          pageClassName={'bg-white text-black rounded px-3 py-1 hover:bg-gray-200 transition duration-300'}
          previousClassName={'bg-white text-black rounded px-3 py-1 hover:bg-gray-200 transition duration-300'}
          nextClassName={'bg-white text-black rounded px-3 py-1 hover:bg-gray-200 transition duration-300'}
          disabledClassName={'opacity-50 cursor-not-allowed'}
          breakClassName={'text-black mx-2'}
        />
      )}
    </div>
  );
};

export default TodoList;
