import React, { useContext, useState } from 'react';
import { Calendar, FilePlus2 } from 'lucide-react';
import { all_provider } from '../components/ContextProvider';
import NavAdmin from '../components/NavAdmin';
// import AdminPass from '../components/AdminPass';
// import NavAdmin from '../components/NavAdmin';

const NewAttendance = () => {
  const { createattendance, Notify } = useContext(all_provider);

  const [newdetail, setnewdetail] = useState({
    year: "2026",
    month: "March",
    week: "week 1",
  });

  const handleCreate = () => {
    createattendance(newdetail.year, newdetail.month, newdetail.week);
  };

  return (
    <div className="w-full min-h-screen">
      <NavAdmin />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold text-center flex items-center justify-center gap-3 text-gray-800 mb-8 mt-5">
           <FilePlus2 size={35} /> 
           Create New Attendance</h1>

        <div className="p-8">
          <div className="grid grid-cols-3 gap-2">
            
            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-center">Year</label>
              <select
                value={newdetail.year}
                onChange={(e) => setnewdetail({ ...newdetail, year: e.target.value })}
                className="w-full border-0 bg-gray-100 rounded-full p-4 text-sm focus:ring-2 focus:ring-blue-200"
              >
                {["2026", "2025", "2024"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Month */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-center">Month</label>
              <select
                value={newdetail.month}
                onChange={(e) => setnewdetail({ ...newdetail, month: e.target.value })}
                className="w-full border-0 bg-gray-100 rounded-full p-4 text-sm focus:ring-2 focus:ring-blue-200"
              >
                {['January','February','March','April','May','June','July','August','September','October','November','December']
                  .map((item) => (
                    <option key={item} value={item.toLowerCase()}>{item}</option>
                  ))}
              </select>
            </div>

            {/* Week */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-center">Week</label>
              <select
                value={newdetail.week}
                onChange={(e) => setnewdetail({ ...newdetail, week: e.target.value })}
                className="w-full border-0 bg-gray-100 rounded-full p-4 text-sm focus:ring-2 focus:ring-blue-200"
              >
                {['week 1', 'week 2', 'week 3', 'week 4','week 5'].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <button
              onClick={handleCreate}
              className="flex items-center gap-3 bg-linear-to-bl from-blue-800 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white px-10 py-4 rounded-full text-base font-medium shadow-md transition-all active:scale-95"
            >
              Create Attendance
              <Calendar size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAttendance;
