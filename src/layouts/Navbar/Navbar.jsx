import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token")
        toast.success("Successfully log out")
        navigate('/register', { replace: true });
    };

    return (
        <nav className="bg-white shadow-md py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-purple-600">
                    Chatbot
                </Link>

                <div className="space-x-4">
                    <Link to="/chats" className="text-gray-600 hover:text-purple-600 font-medium">
                        Chats
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-purple-600 font-medium">
                        Login
                    </Link>
                    <Link to="/register" className="text-gray-600 hover:text-purple-600 font-medium">
                        Register
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
                  

        </nav>
    );
};

export default Navbar;
