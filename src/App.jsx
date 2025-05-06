import React from 'react'
import './App.css'
import Chat from './Chats/Chat'
import SignupForm from "./Auth/SignupForm"
import Login from './Auth/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import GoogleCallbackHandler from './CallBack Hnadler/GoogleCallbackHandler'
import NotFound from '../src/Pages/NotFoundPage/NotFound'

const App = () => {
  return (
    <>
      <Routes>

        <Route path='/register' element={<SignupForm />} />
        <Route path='/login' element={<Login />} />
        <Route path="/google-callback" element={<GoogleCallbackHandler />} />
        <Route path="/chats" element={<Chat />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />

    </>
  )
}

export default App