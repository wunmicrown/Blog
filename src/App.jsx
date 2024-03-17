import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Write from './pages/Write'
import Layout from './Components/Layout'
import { ToastContainer } from 'react-toastify'
import Homepage from './pages/Homepage'

const App = () => {
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/write' element={<Write />} />
                </Route>
            </Routes>
        </>
    )
}

export default App