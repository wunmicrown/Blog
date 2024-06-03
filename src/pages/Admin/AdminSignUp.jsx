import { useFormik } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { API_URL } from "../constants/Api";
import { registerAdminSchema } from "../validationSchema/adminReg";
import { toast } from "react-toastify";
import { FaBlog } from "react-icons/fa";
import Loading from "../loading/Loading";
import { useState } from "react";
import NotFoundPage from "../NotFoundPage";

const AdminSignUp = () => {
  const params = useParams();
  const routeKey = params.key;

  const URL = `${API_URL}/api/v1/users/register`;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.post(URL, values, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.setItem('userDetails', JSON.stringify(response.data.user));
      toast.success("User registered successfully.");
      navigate("/verify-email");
    } catch (error) {
      console.error("Sign up error:", error); // Add this log
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        toast.error(`Sign up failed: ${errorMessage}`);
      } else {
        toast.error("Sign up failed: An unknown error occurred.");
      }
      setLoading(false);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      userType: "Admin",
    },
    validationSchema: registerAdminSchema,
    onSubmit,
  });

  return (
    <div>
      {routeKey !== import.meta.env.VITE_ADMIN_ROUTE_KEY ? (
        <NotFoundPage />
      ) : (
        <section>
          <main className="pt-20 pb-5">
            <div className="max-w-md mx-auto shadow-lg p-6 rounded">
              <FaBlog className="text-green-500 h-16 mx-auto w-full mt-4 mb-4" />
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-500">
                    Name
                  </label>
                  <div className="flex items-center border rounded-md px-3 py-2">
                    <AiOutlineUser className="mr-2 text-gray-500 " />
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      autoComplete="false"
                      placeholder="Name"
                      className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                    />
                  </div>
                  <span className="text-red-500">{errors.name}</span>
                </div>
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
                      autoComplete="false"
                      placeholder="Username"
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
                <div className="mb-4">
                  <label htmlFor="userType" className="block text-sm font-medium text-gray-500">
                    Register As
                  </label>
                  <select
                    name="userType"
                    onChange={handleChange}
                    value={values.userType}
                    className="p-2 py-3.5 flex-grow text-gray-500 font-medium placeholder-gray-500 bg-white outline-none border border-green-200 rounded-lg focus:ring focus:ring-green-200"
                  >
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                {loading ? (
                  <Loading />
                ) : (
                  <button
                    className="w-full bg-green-500 text-black py-2 px-4 rounded-md hover:bg-green-600 outline-none focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 focus:ring-offset-green-100"
                    type="submit"
                    disabled={loading}
                  >
                    Sign Up as Admin
                  </button>
                )}
                <div className="text-center mt-4 mb-14">
                  <p className="text-gray-500">Already have an admin account?</p>
                  <Link to="/login" className="text-green-400 hover:underline">Admin Login here</Link>
                </div>
              </form>
            </div>
          </main>
        </section>
      )}
    </div>
  );
};

export default AdminSignUp;
