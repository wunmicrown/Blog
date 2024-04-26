import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { API_URL } from "../constants/Api";
import { registerSchema } from "../validationSchema/registerSchema";
import { toast } from "react-toastify";
import { FaBlog } from "react-icons/fa";
import Loading from "../loading/Loading";
import { useState } from "react";

const SignUp = () => {
  const URL = `${API_URL}/api/v1/users/register`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const response = await axios.post(URL, values);
      // console.log(response);
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));

      toast.success("User registered successfully. Verification OTP sent to email.");
      navigate("/verify-email");
    } catch (error) {
      toast.error(`Sign up failed: ${error.response.data}`);
      setLoading(false)
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <>
      <section>
        <main className=" pt-20 pb-5">
          <div className="max-w-md mx-auto shadow-lg p-6 rounded">
            <FaBlog className=" text-green-500 h-16 mx-auto w-full mt-4 mb-4" />

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-500">
                  Username
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineUser className="mr-2 text-gray-500 " />
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    placeholder="username"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.username}</span>

              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineMail className="mr-2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    placeholder="Email Address"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.email}</span>
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-500">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <AiOutlineLock className="mr-2 text-gray-500" />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    placeholder="Password"
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  />
                </div>
                <span className="text-red-500">{errors.password}</span>
              </div>
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="mb-4 mt-9 p-4 py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-500 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 flex items-center justify-center animate-pulse"
                  type="submit"
                  disabled={loading}
                >
                  Sign Up
                </button>
              )}


              {/* <button
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 outline-none focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-green-100"              >
                Sign Up
              </button> */}
              <div className="text-center mt-4">
                <p className="text-gray-500">Already have an account?</p>
                <Link to="/login" className="text-green-400 hover:underline">Login here</Link>
              </div>
            </form>
          </div>
        </main>
      </section>
    </>
  );
};

export default SignUp;
