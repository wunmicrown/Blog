import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../components/constants/Api';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const URL = `${API_URL}/users/verify-email`;

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
                const response = await axios.post(URL, { ...values, email });
                console.log(response);
                if (response.data.user.emailVerified) {
                    navigate('/dashboard');
                    toast.success("OTP verified successfully");
                } else {    
                    // Email not verified
                    navigate('/login'); // Navigate back to login
                    toast.error("Email verification failed");
                }
            } catch (error) {
                setError(error.response?.data?.message || 'Verification failed');
                toast.error(error.response?.data?.message || 'Verification failed');
            } finally {
                setLoading(false);
            }
        },
    });

    const handleResendOTP = () => {
        setResendLoading(true);
        axios.post(`${API_URL}/resendSignupOTP`, { email })
            .then(() => {
                alert('OTP has been resent successfully!');
            })
            .catch(() => {
                alert('Failed to resend OTP. Please try again later.');
            })
            .finally(() => {
                setResendLoading(false);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <div className="bg-[#121212] shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="block text-center text-xl mb-6 text-blue-700 font-bold">Verify OTP</h2>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="otp"
                            onChange={formik.handleChange}
                            value={formik.values.otp}
                            placeholder="Enter OTP"
                            className="bg-white focus:border-blue-500 rounded-lg shadow appearance-none border  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </button>
                        <button type="button" onClick={handleResendOTP} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline" disabled={resendLoading}>
                            {resendLoading ? 'Resending...' : 'Resend OTP'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;