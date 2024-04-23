import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/auth/Login';
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
import UserProfileDetails from './pages/dashboardsFolder/UserProfileDetails';
import SettingLayout from './pages/settings/SettingLayout';
import ChangeEmail from './pages/settings/ChangeEmail';
import Uploadpic from './pages/settings/profile/Uploadpic';
import ChangePassword from './pages/settings/ChangePassword';
import AddComment from './pages/comments/AddComment';
import CommentsList from './pages/comments/CommentLists';
import CreatePosts from './pages/posts/CreatePosts';
import PostsDetails from './pages/posts/PostsDetails';
import CreateCategoryForm from './pages/category folder/CreateCategoryForm';

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
                </Route>
                <Route path='/' element={<DashboardPath />}>
                    <Route path="/posts" element={<Dashboard />} />
                    <Route path="/posts/:postId" element={<PostsDetails />} />
                    <Route path="/create-post" element={<CreatePosts />} />
                    <Route path="/user-profile-details" element={<UserProfileDetails />} />
                </Route>
                <Route path="/settings" element={<SettingLayout />} >
                    <Route path="/settings/profile" element={<ChangeEmail />} />
                    <Route path="/settings/change-password" element={<ChangePassword />} />
                    <Route path="/settings/create-category" element={<CreateCategoryForm />} />
                    <Route path="" element={<Uploadpic />} />
                    <Route path="" element={<AddComment />} />
                    <Route path="" element={<CommentsList />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
