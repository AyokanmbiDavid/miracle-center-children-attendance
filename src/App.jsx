import React, { useContext } from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import Notify from './components/Notify.jsx'
import { all_provider } from './components/ContextProvider.jsx'
import MemberData from './pages/MemberData.jsx'
import NewAttendance from './pages/NewAttendance.jsx'
import AllAttendance from './pages/AllAttendance.jsx'
const App = () => {
  const {notifystatus} = useContext(all_provider)
  return (
    <>
      <Navbar/>
      {notifystatus.show == true && 
      <Notify/>}
      <div className="bg-grid mt-20 px-3">
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/admin' element={<AdminPage/>} />
          <Route path='/memberdata' element={<MemberData/>} />
          <Route path='/newattendance' element={<NewAttendance/>} />
          <Route path='/allattendance' element={<AllAttendance/>} />
          <Route path='/memberdata' element={<MemberData/>} />
        </Routes>
      </div>
    </>
  )
}

export default App