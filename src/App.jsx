import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/pages/Home'
import Register from './Components/pages/auth/Register'
import Login from './Components/pages/auth/Login'
import Write from './Components/pages/Write'

const App = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/write' element={<Write />} />
            </Routes>
        </>
    )
}

export default App