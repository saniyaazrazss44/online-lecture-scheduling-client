import React from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import LoginInstructor from './components/LoginInstructor'
import LoginAdmin from './components/LoginAdmin'
import HomeInstructor from './components/HomeInstructor'


function App() {

  const user_Id = localStorage.getItem('token')

  return (
    <BrowserRouter>
      {user_Id ? (<Routes>
        <Route path='/admin/home' element={<Home />} />
        <Route path='/instructor/home' element={<HomeInstructor />} />
      </Routes>) : (<Routes>
        <Route path='/' element={<LoginAdmin />} />
        <Route path='/adminLogin' element={<LoginAdmin />} />
        <Route path='/instructorLogin' element={<LoginInstructor />} />
      </Routes>)
      }
    </BrowserRouter>
  )
}

export default App
