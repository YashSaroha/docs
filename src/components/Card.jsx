import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { RiCloseFill } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { motion } from 'framer-motion'

const Card = ({ todo, setTodo, todoArray, setTodoArray, reference }) => {

    return (
        <motion.div drag dragConstraints={reference} whileDrag={{ scale: 1.1 }} dragElastic={0.2} dragTransition={{ bounceStiffness: 200, bounceDamping: 10 }} className='relative flex-shrink-0 w-44 h-64 rounded-[40px] bg-zinc-900/90 text-white px-5 py-6 overflow-hidden'>
            <FaRegFileAlt />
            {/* <textarea type="text" value={todo} onChange={handleChange} className='mt-3 h-[65%] w-full bg-transparent outline-none overflow-y-hidden resize-none' /> */}
            <p className='text-sm leading-tight mt-5 text-white'>{todo}</p>
            <div className='footer absolute bottom-0 left-0 w-full'>

                <div className='flex items-center justify-between px-8 py-3'>
                    {/* <h5 className='text-sm'>{data.fileSize}</h5> */}
                    <span className='w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer'>
                        <MdOutlineEdit />
                    </span>
                    <span className='w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer'>
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
    )
}

export default Card