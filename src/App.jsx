import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/Login'
import Write from './pages/Write'
import Homepage from './pages/Homepage'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from './pages/auth/VerifyEmail'
import Layout from './components/Layout'


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
                <Route path="/" element={<Layout />}>
                    
                    <Route index element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/write" element={<Write />} />
                    {/* <Route path="/posts" element={<Posts/>} /> */}

                </Route>
            </Routes>


        </>
    )
}

export default App