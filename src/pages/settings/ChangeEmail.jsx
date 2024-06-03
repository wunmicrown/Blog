import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../constants/Api";
import { FaBlog } from "react-icons/fa";
import Loading from "../loading/Loading";
import { AiOutlineMail } from "react-icons/ai";
import Uploadpic from "./profile/Uploadpic";
import ChangePassword from "./ChangePassword";

const ChangeEmail = () => {
  const URL = `${API_URL}/api/v1/users/change-email`;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(URL, { email, password }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success(response.data.message);
      // Update email in localStorage
      localStorage.setItem("userDetails", JSON.stringify({ ...JSON.parse(localStorage.getItem("userDetails")), email }));

      if (response.data.status) {
        navigate(`/verify-email`);
      }
    } catch (error) {
      console.error("Error updating email:", error);
      // Display error message
      toast.error(error.response.data.message || "Failed to change email");
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
      <div>
        <Uploadpic />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9FAFB]">
        <div className="w-auto p-6 bg-white">
          <FaBlog className=" text-green-500 h-16 mx-auto w-full mt-8 mb-8" />
          <p className="text-gray-600 text-center mb-4">
            Change your email address and we'll send you an <span className="text-green-600 font-bold">OTP</span> to verify your email
          </p>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Change email
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mb-6 relative">
              <AiOutlineMail className="absolute text-gray-500 text-2xl top-2 left-2" />

              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <button
              className="w-full px-4 py-2 text-black bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
              onClick={handleSubmit}
              disabled={loading}
            >
              Change
            </button>
          )}

          <ChangePassword />
        </div>
      </div>
    </>
  );
};

export default ChangeEmail;