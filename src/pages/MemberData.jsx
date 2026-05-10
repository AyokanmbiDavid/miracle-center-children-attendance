import React, { useContext } from 'react';
import AdminPass from '../components/AdminPass';
import NavAdmin from '../components/NavAdmin';
import DataTable from '../components/DataTable';
import { Download, Search, X, FileText, UserCircle } from 'lucide-react';
import { all_provider } from '../components/ContextProvider';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion } from "framer-motion";

const MemberData = () => {
  const { search, setsearch, alldata } = useContext(all_provider);
  const isSearching = search.trim().length > 0;

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      const term = search.trim().toLowerCase();
      const filteredData = term 
        ? alldata.filter(m => m.surname?.toLowerCase().includes(term)) 
        : [...alldata];

      const sortedData = filteredData.sort((a, b) => {
        const surnameA = (a.surname || "").toLowerCase();
        const surnameB = (b.surname || "").toLowerCase();
        return surnameA.localeCompare(surnameB) || (a.firstName || "").localeCompare(b.firstName || "");
      });

      // PDF Styling - Google Colors
      doc.setFontSize(20);
      doc.setTextColor(11, 87, 208); // Google Blue
      doc.text("Member Directory - Miracle Centre", 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Exported on: ${new Date().toLocaleDateString()}`, 14, 28);

      autoTable(doc, {
        startY: 35,
        head: [['S/N', 'Full Name', 'Phone', 'DOB', 'Email', 'Gender']],
        body: sortedData.map((m, i) => [
          i + 1, 
          `${(m.surname || "").toUpperCase()}, ${m.firstName || ""}`.trim(), 
          m.phoneNumber || "-", 
          m.dateOfBirth || "-",
          m.emailAddress || "-",
          m.gender || "-"
        ]),
        headStyles: { fillColor: [11, 87, 208], fontSize: 10 },
        styles: { fontSize: 9 },
      });

      doc.save(`Miracle_Members_${new Date().toISOString().slice(0,10)}.pdf`);
    } catch (err) { alert("PDF generation failed"); }
  };

  return (
    <div className="w-full  min-h-screen bg-[#F8F9FA] pb-20"> {/* Google Background */}
      <AdminPass>
        <NavAdmin />
        
        <div className="max-w-6xl relative mx-auto px-4 mt-8">
          
          {/* Header Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2">
            <div className="flex items-center gap-4">
              <div className="bg-[#D3E3FD] p-3 rounded-lg text-[#041E49]">
                <UserCircle size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-medium text-[#1F1F1F]">Member Directory</h1>
                <p className="p-2 bg-blue-100 rounded-sm text-xs text-[#44474E]"><span className="text-blue-600">{alldata?.length || 0}</span> total records registered</p>
              </div>
            </div>
            
            <button 
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-[#0B57D0] text-white px-6 p-3 rounded-lg text-xs font-medium hover:shadow-lg transition-all active:scale-95"
            >
              <Download size={18} />
              Export PDF
            </button>
          </div>

          {/* Google Style Search Bar */}
          <motion.div 
            initial={{ y: -10, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="sticky top-40 z-30 mb-6"
          >
            <div className=" group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0B57D0] transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Search by surname (e.g. Adebayo)"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
                className="w-full p-3 pl-14 pr-14 rounded-lg bg-white border border-[#DEE2E6]  focus:border-transparent focus:ring-2 focus:ring-[#0B57D0] outline-none text-xs transition-all"
              />
              {isSearching && (
                <button 
                  onClick={() => setsearch("")} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={18} className="text-gray-500" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Table Container (M3 Surface Container) */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-white rounded-[28px] border border-[#EFF2F5] shadow-[0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <div className="overflow-x-auto">
                {/* Your DataTable Component */}
                <div className="p-2">
                    <DataTable />
                </div>
            </div>
          </motion.div>

          {/* Result Count Footer */}
          {isSearching && (
            <p className="mt-4 px-6 text-sm text-gray-500 italic">
              Showing filtered results for "{search}"
            </p>
          )}
        </div>
      </AdminPass>
    </div>
  );
};

export default MemberData;
