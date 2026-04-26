import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const all_provider = createContext();
const api = axios.create({
  // ""http://localhost:5000/api""
  baseURL: "https://teens-attendance-backend.onrender.com/api" ,
  timeout: 7000,
  headers:{
    
    'Content-Type':'application/json',
    'Accept':'application/json'
  }
})

const ContextProvider = ({ children }) => {
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [alldata, setalldata] = useLocalStorage("members",[])
  const [attendance, setattendance] = useLocalStorage("attendance",[])
  const [currentroll, setcurrentroll] = useState({ roll: [] });
  const [attendancedate, setattendancedate] = useState(() => 
    JSON.parse(localStorage.getItem('attendancedate')) || { year: "2026", month: "march", week: "week 1" }
  );

  const [notifystatus, setnotifystatus] = useState({ type: "", message: "", show: false });

  const Notify = (type, message) => {
    setnotifystatus({ type, message, show: true });
    if (type !== "loading") setTimeout(() => setnotifystatus({ type: "", message: "", show: false }), 3000);
  };

  const closenotify = () => setnotifystatus({ type: "", message: "", show: false });

  const fetchEverything = useCallback(async () => {
    try {
      Notify("loading", 'updating data')
      const [mRes, aRes] = await Promise.all([
        api.get('/members'),
        api.get('/attendance')
      ]);

      const members = mRes.data
      const attHistory = aRes.data

        setalldata(members);
        setattendance(attHistory);
      Notify("success","you are connected")

    } catch (err) {
      console.error("Backend sync failed.",err.message);
      Notify('failure','no network, connet to the internet')
    }
  }, []);

  useEffect(() => { fetchEverything(); }, [fetchEverything]);

  useEffect(() => {
    const found = attendance.find(att => 
      String(att.year) === String(attendancedate.year) && 
      att.month === attendancedate.month && 
      att.week === attendancedate.week
    );
    setcurrentroll(found || { roll: [] });
    localStorage.setItem('attendancedate', JSON.stringify(attendancedate));
  }, [attendancedate, attendance]);

  useEffect(() => {
    const res = (currentroll?.roll || []).filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchresult(res);
  }, [search, currentroll]);

  // Actions
  const addnewmember = async (surname, firstName,middleName, phoneNumber, dateOfBirth,gender,emailAddress) => {
    Notify("loading", "Adding new member");

    const findmember = alldata.find(e => e.surname == surname && e.firstName == firstName && e.middleName == middleName)

    if (!findmember) {
    try {
     
      // Axios simplifies the body to just data and handles JSON.stringify fo you
      await api.post('/members', {
        surname: surname,
        firstName: firstName,
        middleName: middleName,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        gender:gender,
        emailAddress: emailAddress
      })

      await fetchEverything();
      Notify("success", "New Member Added")
    } catch (err) { 
      Notify("failure", "Failed to add member");
      console.error(err)
    } }
    else {
      Notify('failure','Member data already registered')
    }
  };

  const updatemember = async (id, data) => {
    Notify("loading", "Updating...");
    try {
      await api.put(`members/${id}`, data)

      await fetchEverything();
      Notify("sucess","member data updated")
    } catch (err) { Notify("failure", "Failed"); console.error(err) }

    // first_name
    // surname
    // middle_name
    // gender
    // email_address
  };

  const deletemember = async (id) => {
    Notify("loading", "Deleting...");
    try {
      await api.delete(`/members/${id}`);

      await fetchEverything();
      Notify("success", "Member Deleted")
    } catch (err) { Notify("failure", "Failed to delete member",);  console.error(err)}
  };

 const markattendance = (memberId, status) => {
  // We ONLY update the local state. 
  // We wait for the user to click "Update Roll" to send it to the server.
  setcurrentroll(prev => ({
    ...prev,
    roll: (prev.roll || []).map(p => 
      (p.memberId === memberId || p.id === memberId) ? { ...p, present: status } : p
    )
  }));
};

const createattendance = async (year,month,week) => {
  Notify("loading", "Creating New Attendance");
  const findattendance = attendance.find(e => e.year == year && e.week == week && e.month == month)
  if(!findattendance){
  try {
    await api.post('/attendance', {year,month,week})

    await fetchEverything();
    Notify('success',"new attendance created")
  } catch (error) {
    Notify ("failure", "failed to create attendance")
  } } else {
    Notify('failure','Attendance had been created')
  }
}

const updateattendance = async (_id,alldata) => {
  try{  
    await api.put(`/attendance/mark/${_id}`, alldata )

    await fetchEverything();
    Notify('success', "Attendance submitted")
  } catch (err) {
    Notify("failure", "Failed to submit attendance")
    console.error(err)
  }
}

  const deleteattendance = async (id) => {
    Notify("loading", "Deleting...");
    try {
      await api.delete(`/attendance/${id}`)

      await fetchEverything();
      Notify("success", "Attendance deleted successfully")
    } catch (err) { Notify("failure", "Error"); console.error(err) }
  };

  return (
    <all_provider.Provider value={{
      alldata, attendance, currentroll, search, setsearch, searchresult, 
      attendancedate, setattendancedate, 
      setyear: (val) => setattendancedate(prev => ({ ...prev, year: val })),
      setmonth: (val) => setattendancedate(prev => ({ ...prev, month: val })),
      setweek: (val) => setattendancedate(prev => ({ ...prev, week: val })),
      addnewmember, updatemember, deletemember, markattendance, createattendance, deleteattendance,
      updateattendance,
      Notify, notifystatus, closenotify, refresh: fetchEverything
    }}>
      {children}
    </all_provider.Provider>
  );
};

export default ContextProvider;