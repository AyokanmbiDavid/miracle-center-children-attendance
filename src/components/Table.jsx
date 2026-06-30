import { CheckCircle2, X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { all_provider } from './ContextProvider'
import {motion} from 'framer-motion'

const Table = ({filter}) => {
    const {attendance,currentclass,markattendance} = useContext(all_provider);
    
    const [filtroll,setfiltroll] = useState(attendance.find(item => item.theclass == currentclass)?.roll || [])

    async function setf () {
        setfiltroll(attendance.find(item => item.theclass == currentclass).roll);
        
    }
    useEffect(() => {
        setf()
    },[currentclass,attendance])

    useEffect(() => {
      async function unload() {
          
        if (!filter) {
            setfiltroll (attendance.find(item => item.theclass == currentclass).roll)
        } else {
            const currentfil = attendance.find(item => item.theclass == currentclass).roll 
            const filteredname = currentfil.filter(e => e.firstname.toLowerCase().includes(filter.toLowerCase()) || e.lastname.toLowerCase().includes(filter.toLowerCase()) );
            setfiltroll(filteredname)
        }
      }

      unload()
    },[filter]);

  return (
    <>
        <div className="w-full flex flex-col mt-2">
            {/* header */}
            <div className="w-full flex justify-between gap-2 items-center">
                <div className="w-1/10 bg-gray-100 p-3 rounded-lg rounded-tl-3xl font-bold text-sm">
                    S/N
                </div>
                <div className="w-6/10 max-sm:7/10 bg-gray-100 p-3 rounded-lg font-bold text-sm">
                    Name
                </div>
                <div className="w-4/10 bg-gray-100 p-3 rounded-lg rounded-tr-3xl font-bold text-sm">
                    Status
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-1">
                {filtroll?.map((item,index) => (
                    <>
                    <motion.div
                    initial={{y:20,opacity:0.5}}
                    animate={{y:0,opacity:1}}
                    transition={{delay: (index * 0.2),ease:'easeInOut'}}
                    className="flex justify-between items-center gap-2">
                        <div className={`w-1/10 bg-blue-100 p-3 font-bold text-sm py-5
                            ${index  == (filtroll?.length - 1) ? 'rounded-bl-3xl rounded-lg' : 'rounded-lg'}`}>
                        {index + 1}
                    </div>
                    <div className={`w-6/10 max-sm:w-7/10 bg-blue-100 p-3 py-5 rounded-lg font-bold text-sm`}>
                        {item.lastname} {item.firstname}
                    </div>
                    <div className={`w-4/10 bg-blue-100 p-3 font-bold text-sm
                        ${index  == (filtroll?.length - 1) ? 'rounded-br-3xl rounded-lg' : 'rounded-lg'}`
                        }>
                        <div className="flex justify-center items-center gap-0.5">
                            <button 
                            onClick={() => markattendance(index,true)}
                            className={`p-3 bg-green-300/70 rounded-l-2xl rounded-lg  duration-400 cursor-pointer
                                ${item.present == true ? 'bg-green-600 text-white shadow-xl' : 'hover:bg-green-400 text-green-900'}`}>
                                <CheckCircle2 size={13}/>
                            </button>

                            <button 
                            
                                onClick={() => markattendance(index,false)}
                                className={`p-3 bg-red-300/70 rounded-r-2xl rounded-lg hover:bg-red-400 duration-400 cursor-pointer
                                ${item.present == false ? 'bg-red-600 text-white shadow-xl' : 'hover:bg-red-400 text-red-900'}`}>
                                <X size={13}/>
                            </button>
                        </div>
                    </div>
                    </motion.div>
                    </>
                ))}
            </div>
            
            {/* no display */}
            {filtroll?.length == 0 && (
                <>
                    <div className="w-full flex justify-center items-center bg-red-100 h-[300px] rounded-3xl border border-red-200">
                        <span className="text-md font-bold text-red-600">
                            No item found on data
                        </span>
                    </div>
                </>
            )}
        </div>
    </>
  ) 
}

export default Table
