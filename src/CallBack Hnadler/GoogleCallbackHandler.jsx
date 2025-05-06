import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallbackHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token)

    if (token) {
      localStorage.setItem("token", token);
      navigate("/chats");
    } else {
      navigate("/register");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="loader mb-4"></div>
      <h1 className="text-xl text-gray-700">Redirecting...</h1>

      <style>
        {`
          .loader {
            border: 6px solid #f3f3f3;
            border-top: 6px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default GoogleCallbackHandler;
