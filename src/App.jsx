import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import Write from './pages/Write';
import Homepage from './pages/Homepage';
import Register from './pages/auth/Register';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import PasswordResetVerification from './pages/auth/PasswordResetVerification';
import PasswordReset from './pages/auth/PasswordReset';
import DashboardPath from './pages/dashboardsFolder/DashboardPath';
import Dashboard from './pages/dashboardsFolder/Dashboard';
import PostsDetails from './components/posts/PostsDetails';

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
                <Route element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/password-reset-verification" element={<PasswordResetVerification />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<PasswordReset />} />
                    <Route path="/write" element={<Write />} />

                </Route>
                    <Route path='/' element={<DashboardPath/>}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/posts/:postId" element={<PostsDetails />} />

                    </Route>
            </Routes>
        </>
    );
};

export default App;
