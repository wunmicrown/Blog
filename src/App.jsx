import React, { useContext } from 'react';
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
import SettingLayout from './pages/settings/SettingLayout';
import ChangeEmail from './pages/settings/ChangeEmail';
import Uploadpic from './pages/settings/profile/Uploadpic';
import ChangePassword from './pages/settings/ChangePassword';
import AddComment from './pages/comments/AddComment';
import CommentsList from './pages/comments/CommentLists';
import CreatePosts from './pages/postsFolder/CreatePosts';
import PostsDetails from './pages/postsFolder/PostsDetails';
import CreateCategoryForm from './pages/category folder/CreateCategoryForm';
import NotFoundPage from './pages/NotFoundPage';
import AdminSignUp from './pages/Admin/AdminSignUp';
import UserProfileDashboard from './pages/dashboardsFolder/UserProfileDashboard';
import PostsList from './pages/postsFolder/PostsList';
import PostByEachUsers from './pages/dashboardsFolder/PostByEachUsers';
import DraftsList from './pages/postsFolder/DraftsList';
import UserDashboard from './pages/dashboardsFolder/UserDashboard';
import PrivateNavbar from './pages/Navbar/PrivateNavbar';
import PublicNavbar from './pages/Navbar/PublicNavbar';
import UpdatePosts from './pages/postsFolder/UpdatePosts ';
import AuthContext, { AuthProvider } from './pages/validationSchema/authContext';


const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

const AppContent = () => {
    const { user } = useContext(AuthContext);

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
            {user ? <PrivateNavbar /> : <PublicNavbar />}
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' index element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/password-reset-verification" element={<PasswordResetVerification />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} /> 
                    <Route path="/reset-password" element={<PasswordReset />} />
                    <Route path="/:id" element={<UserDashboard />} />
                </Route>
                <Route path='/' element={<DashboardPath />}>
                    <Route path="/:id/posts" element={<PostByEachUsers />} />
                    <Route path="/home" element={<PostsList />} />
                    <Route path="/:id/drafts" element={<DraftsList />} />
                    <Route path="/posts/:postId" element={<PostsDetails />} />
                    <Route path="/:id/profile"element={<UserProfileDashboard />} />
                    <Route path="/auth/reg/:key/admin" element={<AdminSignUp />} />
                    <Route path="/create-post" element={<CreatePosts />} />
                    <Route path="/create-category" element={<CreateCategoryForm />} />
                    <Route path="/update-post/:postId/edit" element={<UpdatePosts />} /> 
                    <Route path="/posts/:postId" element={<AddComment />} />
                </Route>
                <Route path="/settings" element={<SettingLayout />} >
                    <Route path="/settings/profile" element={<ChangeEmail />} />
                    <Route path="/settings/change-password" element={<ChangePassword />} />
                    <Route path="" element={<Uploadpic />} />
                    <Route path="" element={<CommentsList />} />
                </Route>
                {/* route for handling non-existing routes */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default App;












// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Layout from './pages/Layout';
// import Login from './pages/auth/Login';
// import Homepage from './pages/Homepage';
// import Register from './pages/auth/Register';
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
// import VerifyEmail from './pages/auth/VerifyEmail';
// import ForgotPassword from './pages/auth/ForgotPassword';
// import PasswordResetVerification from './pages/auth/PasswordResetVerification';
// import PasswordReset from './pages/auth/PasswordReset';
// import DashboardPath from './pages/dashboardsFolder/DashboardPath';
// import SettingLayout from './pages/settings/SettingLayout';
// import ChangeEmail from './pages/settings/ChangeEmail';
// import Uploadpic from './pages/settings/profile/Uploadpic';
// import ChangePassword from './pages/settings/ChangePassword';
// import AddComment from './pages/comments/AddComment';
// import CommentsList from './pages/comments/CommentLists';
// import CreatePosts from './pages/postsFolder/CreatePosts';
// import PostsDetails from './pages/postsFolder/PostsDetails';
// import CreateCategoryForm from './pages/category folder/CreateCategoryForm';
// import NotFoundPage from './pages/NotFoundPage';
// import AdminSignUp from './pages/Admin/AdminSignUp';
// import UserProfileDashboard from './pages/dashboardsFolder/UserProfileDashboard';
// import PostsList from './pages/postsFolder/PostsList';
// import UpdatePosts from './pages/postsFolder/UpdatePosts ';
// import PostByEachUsers from './pages/dashboardsFolder/PostByEachUsers';

// import DraftsList from './pages/postsFolder/DraftsList';
// import UserDashboard from './pages/dashboardsFolder/UserDashboard';

// const App = () => {
//     return (
//         <>
//             <ToastContainer
//                 position="top-center"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//             <Routes>
//                 <Route element={<Layout />}>
//                     <Route path='/' index element={<Homepage />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/register" element={<Register />} />
//                     <Route path="/verify-email" element={<VerifyEmail />} />
//                     <Route path="/password-reset-verification" element={<PasswordResetVerification />} />
//                     <Route path="/forgot-password" element={<ForgotPassword />} /> 
//                     <Route path="/reset-password" element={<PasswordReset />} />
//                     <Route path="/:id" element={<UserDashboard />} />

//                 </Route>
//                 <Route path='/' element={<DashboardPath />}>
//                     <Route path="/:id/posts" element={<PostByEachUsers />} />
//                     <Route path="/home" element={<PostsList />} />
//                     <Route path="/:id/drafts" element={<DraftsList />} />
//                     <Route path="/posts/:postId" element={<PostsDetails />} />
//                     <Route path="/:id/profile"element={<UserProfileDashboard />} />
//                     <Route path="/auth/reg/:key/admin" element={<AdminSignUp />} />
//                     <Route path="/create-post" element={<CreatePosts />} />
//                     <Route path="/create-category" element={<CreateCategoryForm />} />
//                     <Route path="/update-post/:postId/edit" element={<UpdatePosts />} /> 
//                     <Route path="/posts/:postId" element={<AddComment />} />
//                 </Route>
//                 <Route path="/settings" element={<SettingLayout />} >
//                     <Route path="/settings/profile" element={<ChangeEmail />} />
//                     <Route path="/settings/change-password" element={<ChangePassword />} />
//                     <Route path="" element={<Uploadpic />} />
//                     <Route path="" element={<CommentsList />} />
//                 </Route>
//                 {/* route for handling non-existing routes */}
//                 <Route path="*" element={<NotFoundPage />} />
//             </Routes>
//         </>
//     );
// };

// export default App;
