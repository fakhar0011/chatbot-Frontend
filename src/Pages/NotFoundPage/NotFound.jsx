import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 text-center px-4">
            <h1 className="text-6xl font-extrabold text-purple-700 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-xl transition duration-300 shadow-lg"
            >
                Go to Sign Up
            </Link>
        </div>
    )
}

export default NotFound