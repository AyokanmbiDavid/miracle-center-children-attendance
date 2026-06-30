import { PersonStanding } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { all_provider } from './ContextProvider'

const Navbar = () => {
    const {currentclass,setcurrentclass} = useContext(all_provider)
    const Navs = [
        {name:'4-5',set:'four'},
        {name:'6-8',set:'six'},
        {name:'9-12',set:'nine'},
    ]
    
  return (
    <>
        <div className="w-full flex p-3 items-center justify-center">
            <div className="bg-blue-100 border border-blue-200 flex justify-center items-center rounded-full p-0.5">
                {Navs.map((item,index) => (
                    <div
                    key={index}
                    onClick={async() => setcurrentclass(String(item.set))}
                    className={`p-5 flex justify-center  items-center ${index == 0 ? 'rounded-4xl rounded-r-2xl' : index == 2 ? 'rounded-4xl rounded-l-2xl' : 'rounded-2xl'} duration-300 cursor-pointer 
                     ${currentclass == item.set ? 'bg-blue-700 text-white shadow-2xl' : 'hover:bg-blue-200'}`}>
                        <span className="text-xs font-bold flex gap-3 items-center">
                            <PersonStanding size={20} />
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Navbar
