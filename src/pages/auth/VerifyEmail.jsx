import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../constants/Api';
import { toast } from 'react-toastify';
import { FaBlog } from 'react-icons/fa';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const URL = `${API_URL}/api/v1/users/verify-email`;

    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        onSubmit: async (values) => {
            setLoading(true);
            setError('');

            const savedUser = localStorage.getItem('userDetails');
            if (!savedUser) return navigate("/login");
            const { email } = JSON.parse(savedUser);
            if (!email) return navigate("/login");

            try {
                const { data } = await axios.post(URL, { ...values, email });
                if (data?.user?.isEmailVerified) {
                    toast.success("OTP verified successfully");
                    const username = data.user.username;
                    navigate(`/${username}/profile`);
                } else {
                    navigate('/login');
                    toast.error("Email verification failed");
                }
            } catch (error) {
                setError(error.data?.message || 'Verification failed');
                toast.error(error.data?.message || 'Verification failed');
            } finally {
                setLoading(false);
            }
        },
    });

    const handleResendOTP = async () => {
        setResendLoading(true);
        try {
            const savedUser = localStorage.getItem('userDetails');
            if (!savedUser) throw new Error("User not found");
            const { email } = JSON.parse(savedUser);
            if (!email) throw new Error("Email not found");

            await axios.post(`${API_URL}/api/v1/users/resend-otp`, { email });
            toast.success('OTP has been resent successfully!');
        } catch (error) {
            console.error('Failed to resend OTP:', error);
            toast.error('Failed to resend OTP. Please try again later.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <div className="shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                    <FaBlog className=" text-green-500 h-16 mx-auto w-full mt-2 mb-6" />
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <div className="">
                            <label htmlFor="Verify OTP" className="block text-sm mb-2 font-medium text-gray-500">
                                Verify OTP
                            </label>
                            <input
                                type="text"
                                name="otp"
                                onChange={formik.handleChange}
                                value={formik.values.otp}
                                placeholder="Enter OTP"
                                className="bg-white font-medium placeholder-gray-500 focus:border-green-500 rounded-lg shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                        <button type="button" onClick={handleResendOTP} className="mb-4  p-4 py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-gradient-to-r from-green-400 to-yellow-200 hover:from-purple-200 hover:to-green-400 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulsee" disabled={resendLoading}>
                            {resendLoading ? 'Resending...' : 'Resend OTP'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
