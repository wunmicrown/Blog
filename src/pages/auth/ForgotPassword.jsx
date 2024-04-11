import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";
import { AiOutlineMail } from "react-icons/ai";
import Loading from "../loading/Loading";
import { FaBlog } from "react-icons/fa";

const ForgotPassword = () => {
    const URL = `${API_URL}/api/v1/users/reset-email`;
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(URL, { email });
            console.log(response);
            toast.success(response.data.message);
            if (response.data.status) {
                navigate(`/password-reset-verification?email=${email}`);
            }
        } catch (error) {
            console.error("Error resetting email:", error);
            toast.error("Failed to reset email. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <div className="w-96 p-6 bg-white rounded-xl shadow-md">
                <FaBlog className=" text-green-500 h-16 mx-auto w-full mt-8 mb-8" />
                    <p className="text-gray-600 text-center mb-4">
                    Enter your email address and we'll send you an <span className="text-green-600 font-bold">OTP</span> to reset your password
                    </p>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Reset password
                        </label>
                        <div className="mb-6 relative">
                            <AiOutlineMail className="absolute text-gray-500 text-2xl top-2 left-2" />

                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            />
                        </div>
                    </div>
                    {/* <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (<Loading/>) : " Send reset otp"}
        </button> */}
                    {loading ? (
                        <Loading />
                    ) : (
                        <button
                            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            Send reset otp
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
