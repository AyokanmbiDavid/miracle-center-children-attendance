import React, { useContext } from 'react'
import Navbar from './components/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Notify from './components/Notify.jsx'
import { all_provider } from './components/ContextProvider.jsx'
import Sidebar from './components/Sidebar.jsx'
import BottomBar from './components/BottomBar.jsx'
import CreateAttendance from './pages/CreateAttendance.jsx'
const App = () => {
  const {notifystatus} = useContext(all_provider)
  return (
    <>
      {notifystatus.show == true && 
      <Notify/>}
      <div className="flex max-md:flex-col w-full h-screen overflow-hidden">
        <Sidebar/>
        <div className="w-full h-9/10">
          <Routes>
           <Route path='/' element={<HomePage/>} />
           <Route path='/createattendance' element={<CreateAttendance/>} />
          </Routes>
        </div>
        <BottomBar/>
      </div>
    </>
  )
}

export default App