import React, { useState, useEffect, useRef } from 'react'
// import Card from './Card'
import { FaRegFileAlt } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const Foreground = () => {

  const [todo, setTodo] = useState("")
  const [todoArray, setTodoArray] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString.length > 0) {
      let todoArray = JSON.parse(localStorage.getItem("todos"))
      setTodoArray(todoArray)
    }
  }, [])

  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todoArray))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const enterPressed = (e) => {
    if (e.key === "Enter") {
      handleSave()
    }
  }

  const handleSave = () => {
    let newTodo = [...todoArray, { id: uuidv4(), todo }]
    setTodoArray(newTodo)
    setTodo("")
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = todoArray.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todoArray.filter(item => {
      return item.id !== id
    });
    setTodoArray(newTodos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let t = todoArray.filter(item => item.id !== id)
    setTodoArray(t)
    saveToLocalStorage()
  }

  const ref = useRef(null)

  return (
    <div className='fixed top-0 left-0 z-[3] w-full h-screen p-5 overflow-y-auto overflow-x-hidden'>

      <div className='flex items-center justify-between w-1/3 h-[7%] bg-zinc-600 rounded-full px-2 mx-auto my-[3%]'>
        <input type="text" value={todo} onChange={handleChange} onKeyDown={enterPressed} placeholder='Add task..' className='w-[90%] h-full rounded-full outline-none pl-2 bg-transparent text-white tracking-wide' />
        <span onClick={handleSave} disabled={todo.length <= 3} className='w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer'>
          <IoCheckmarkDone className='w-[20px] h-[20px]' />
        </span>
      </div>

      <div ref={ref} className='flex gap-5 flex-wrap h-[83%]'>
        {todoArray.length === 0 && <div className='m-5'>No Todos to display</div>}
        {todoArray.map((item) => {
          return <motion.div key={item.id} drag dragConstraints={ref} whileDrag={{ scale: 1.1 }} dragElastic={0.2} dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }} className='relative flex-shrink-0 w-40 h-56 rounded-[40px] bg-zinc-900/90 text-white px-5 py-6 overflow-hidden'>
            <FaRegFileAlt />
            <p className='text-sm leading-tight mt-5 text-gray-300'>{item.todo}</p>
            <div className='footer absolute bottom-0 left-0 w-full'>

              <div className='flex items-center justify-between px-8 py-3'>
                <span onClick={(e) => handleEdit(e, item.id)} className='w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer'>
                  <MdOutlineEdit />
                </span>
                <span onClick={(e) => handleDelete(e, item.id)} className='w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer'>
                  <RiCloseFill />
                </span>
              </div>

              {/* {data.tag.isOpen && (
                    <div className={`tag w-full py-2 ${data.tag.tagColor == "green" ? "bg-green-600" : "bg-blue-600"} flex items-center justify-center`}>
                        <h3 className='text-xs font-semibold cursor-pointer'>{data.tag.tagTitle}</h3>
                    </div>
                )} */}

            </div>
          </motion.div>
        })}
      </div>
    </div>
  )
}

export default Foreground