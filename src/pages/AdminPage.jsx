import React, { useContext, useState } from 'react';
import { Check, UserPlus, Info } from 'lucide-react';
import { all_provider } from '../components/ContextProvider';
import NavAdmin from '../components/NavAdmin';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const { addnewmember, Notify } = useContext(all_provider);

  const [newdata, setnewdata] = useState({
    surname: '',
    firstName: '',
    middleName: '',
    phoneNumber: '',
    dateOfBirth: '',
    emailAddress: '',
    gender: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newdata.surname || !newdata.firstName || !newdata.phoneNumber) {
      Notify("failure", "Please fill in the required fields");
      return;
    }

    await addnewmember(
      newdata.surname, newdata.firstName, newdata.middleName, 
      newdata.phoneNumber, newdata.dateOfBirth, newdata.gender, 
      newdata.emailAddress
    );

    setnewdata({
      surname: '', firstName: '', middleName: '',
      phoneNumber: '', dateOfBirth: '', emailAddress: '', gender: '',
    });
  };

  // Helper for M3 Styled Inputs (Tonal Container Style)
  const InputField = ({ label, placeholder, value, onChange, type = "text", required }) => (
    <div className="flex flex-col gap-1.5">
      <label className="ml-4 text-[12px] font-medium text-[#44474E]">
        {label} {required && <span className="text-[#B3261E]">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#F1F3F4] hover:bg-[#E8EAED] focus:bg-white border-b-2 border-transparent focus:border-[#0B57D0] rounded-4xl px-5 py-4 text-sm transition-all outline-none"
      />
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#F8F9FA] pb-20">
      <NavAdmin />
      
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto px-4 mt-8"
      >
        {/* Header Section */}
        <header className="mb-10 flex items-center gap-5 px-2">
            <div className="bg-[#D3E3FD] p-4 rounded-[24px] text-[#041E49]">
                <UserPlus size={28} />
            </div>
            <div>
                <h1 className="text-3xl font-medium text-[#1F1F1F]">Management</h1>
                <p className="text-sm text-[#44474E]">Add a new teen to the Miracle Center database</p>
            </div>
        </header>

        {/* Main Form Container (M3 Surface) */}
        <div className="bg-white rounded-[28px] p-6 md:p-10 shadow-sm border border-[#EFF2F5]">
          <div className="flex items-center gap-2 mb-8 text-[#0B57D0]">
            <Info size={18} />
            <h2 className="text-lg font-medium">Personal Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              
              <InputField 
                label="Surname" required
                placeholder="e.g. Adebayo" 
                value={newdata.surname} 
                onChange={(e) => setnewdata({ ...newdata, surname: e.target.value })} 
              />

              <InputField 
                label="First Name" required
                placeholder="e.g. Samuel" 
                value={newdata.firstName} 
                onChange={(e) => setnewdata({ ...newdata, firstName: e.target.value })} 
              />

              <InputField 
                label="Middle Name" 
                placeholder="Optional" 
                value={newdata.middleName} 
                onChange={(e) => setnewdata({ ...newdata, middleName: e.target.value })} 
              />

              <InputField 
                label="Phone Number" type="tel" required
                placeholder="080XXXXXXXX" 
                value={newdata.phoneNumber} 
                onChange={(e) => setnewdata({ ...newdata, phoneNumber: e.target.value })} 
              />

              <InputField 
                label="Date of Birth" 
                placeholder="DD/MM/YYYY" 
                value={newdata.dateOfBirth} 
                onChange={(e) => setnewdata({ ...newdata, dateOfBirth: e.target.value })} 
              />

              <InputField 
                label="Email" type="email"
                placeholder="teen@example.com" 
                value={newdata.emailAddress} 
                onChange={(e) => setnewdata({ ...newdata, emailAddress: e.target.value })} 
              />

              {/* Gender Segmented Button Group */}
              <div className="flex flex-col gap-1.5">
                <label className="ml-4 text-[12px] font-medium text-[#44474E]">Gender</label>
                <div className="flex bg-[#F1F3F4] p-1 rounded-full border border-[#DEE2E6]">
                  {['Male', 'Female'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setnewdata({ ...newdata, gender: item })}
                      className={`flex-1 py-3 rounded-full text-sm font-medium transition-all ${
                        newdata.gender === item 
                        ? "bg-green-200 text-[#041E49]" 
                        : "text-[#44474E] hover:bg-black/5"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-center md:justify-end pt-8 border-t border-[#F1F3F4]">
              <button
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-[#0B57D0] text-white px-12 py-4 rounded-full font-medium hover:shadow-lg active:scale-95 transition-all"
              >
                Register Member <Check size={20} />
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPage;
