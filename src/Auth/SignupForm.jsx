import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", formData);
      navigate("/login");
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong, please try again";
      toast.error(message);
    }
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

        <div className='flex flex-col'>
  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    value={formData.username}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    required
  />
</div>

<div className='flex flex-col'>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
  <input
    type="email"
    name="email"
    id="email"
    value={formData.email}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    required
  />
</div>

<div className='flex flex-col'>
  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
  <input
    type="password"
    name="password"
    id="password"
    value={formData.password}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
    required
    minLength={6}
  />
</div>


          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition font-semibold shadow-md cursor-pointer"
          >
            Sign Up
          </button>

          <a
            href="http://localhost:8080/auth/google"
            className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-300 py-2 px-4 rounded-xl hover:bg-gray-100 transition font-semibold shadow-md cursor-pointer"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </a>
        </form>

        <p className="text-sm text-center text-gray-500 mt-5">
          Already have an account?{' '}
          <a href="/login" className="text-purple-600 hover:underline">Log in</a>
        </p>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default SignupForm;
