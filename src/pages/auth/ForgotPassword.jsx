import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";

const ForgotPassword = () => {
  const URL = `${API_URL}/users/reset-email`;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(URL, { email });
      toast.success(response.data.message);
      if (response.data.status) {
        navigate(`/verify-email?email=${email}`);
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
    
    <div className="flex items-center  justify-center h-screen text-gray-400">
      <div className="bg-[#121212] shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-blue-700">Find Your Account</h1>
        <p className="mb-4">
          Please enter your email address or mobile number to search for your
          account.
        </p>
        <div className="flex items-center border-b border-gray-300 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address or mobile number"
            className="flex-1 mr-2 border-none focus:outline-none bg-slate-200 rounded-lg w-[444px] p-3"
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Email"}
        </button>
      </div>
    </div>
    </>
  );
};

export default ForgotPassword;
