import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate();
  let handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }
  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      localStorage.setItem("token", response.data.token)
      console.log(response.data.token);
      navigate("/chats")
      return response
    } catch (error) {
      console.log(error.message);
    }
    setFormData({
      email: "",
      password: "",
    })
  }
  return (
    <>
      <div className="bg-gradient-to-br from-blue-100 via-white to-purple-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className='flex items-center gap-4'>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder='Enter your email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <div className='flex items-center gap-4'>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder='Enter your password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>

            <button
              type='submit'
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 transition font-semibold shadow-md cursor-pointer"
            >
              Log In
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-5">
            Don’t have an account?{' '}
            <a href="/register" className="text-purple-600 hover:underline">Sign up</a>
          </p>
        </div>
      </div>
    </>
  )

}

export default Login