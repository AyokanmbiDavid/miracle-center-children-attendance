import React, { useContext } from 'react';
import { Check, X } from 'lucide-react';
import { all_provider } from './ContextProvider';
import { motion } from 'framer-motion';

const Table = () => {
  const { currentroll, markattendance, search } = useContext(all_provider);

  // Derive display list: Filter the current roll's students based on search
  const rollData = currentroll?.roll || [];
  const displayList = rollData.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const sortedList = [...displayList].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mt-6 w-full overflow-x-auto">
      {/* real table */}
      <div className="w-full mt-3 mb-3 px-3">
        {/* header */}
        <div className="w-full flex px-3">
          <div className="w-1/12 text-sm font-semibold">
              S/N
          </div>
          
          <div className="w-7/12 text-sm font-semibold">
              Full Name
          </div>

          <div className="w-4/12 text-sm lg:pl-10 font-semibold">
              Attendance
          </div>
        </div>

        <div className="w-full mt-1">
            {sortedList.map((item, i) => (
            <motion.tr 
              key={item.memberId || item.id || i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="px-3 flex items-center w-full bg-gray-50 hover:bg-blue-100 rounded-5xl transition-colors"
            >
              <div className="w-1/12 text-sm font-semibold">
             {i + 1}
          </div>

              <div className="w-6/12 text-sm font-semibold">
              {item.title}
          </div>

              <div className=" w-5/12 p-4 text-center">
                <div className="flex items-center justify-center gap-4 ">
                 <div className="flex bg-blue-100/60 p-1 gap-2 rounded-full">
                   <button
                    onClick={() => markattendance(item.memberId || item.id, true)}
                    className={`flex items-center gap-1.5 p-3 text-xs font-medium rounded-4xl transition-all ${
                      item.present === true 
                        ? 'bg-green-400 text-white shadow-lg' 
                        :  'text-gray-400  hover:bg-green-50'
                    }`}
                  >
                    <Check size={16} />
                  </button>

                  <button
                    onClick={() => markattendance(item.memberId || item.id, false)}
                    className={`flex items-center gap-1.5 p-3 text-xs font-medium transition-all rounded-4xl ${
                      item.present === false 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : ' text-gray-400 hover:bg-red-50'
                    }`}
                  >
                    <X size={16} /> 
                  </button>
                 </div>
                </div>
              </div>
            </motion.tr>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;