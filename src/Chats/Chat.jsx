import React, { useEffect, useState } from 'react';
import { chatApi, newChatApi, deleteChat, updatedChat } from '../API/ChatApi';
import Navbar from '../Layouts/Navbar/Navbar';
import axios from 'axios';
import Footer from '../Layouts/footer/Footer';


const Chat = () => {
    const [chats, setChats] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        from: '',
        msg: '',
        to: '',
    });

    const [editId, setEditId] = useState(null);
    const [editMsg, setEditMsg] = useState('');

    const getChatData = async () => {
        try {
            let chatdata = await chatApi();
            setChats(chatdata)
        } catch (err) {
            console.log(err, "API failed to fatch the data")
        }
    }
    useEffect(() => {
        getChatData();
        const token = localStorage.getItem("token");
        // console.log("Using token:", token);

        axios
            .get("http://localhost:8080/chats", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setChats(res.data.chats);
            })
            .catch((err) => {
                setError(err.response?.data?.message || "Something went wrong");
                console.error(err);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newChat = {
                ...formData,
                created_at: new Date().toISOString(),
            };
            let postNewChat = await newChatApi(newChat);
            setChats(prev => [...prev, postNewChat]);
            setFormData({ from: '', msg: '', to: '' });
            setShowForm(false);
        } catch (err) {
            console.log(err, "Failed to post newChat")
        }
    };
    const handleDelete = async (id) => {
        try {
            let deletedChat = await deleteChat(id);
            await getChatData();
            console.log(deletedChat, "Chat has been deleted");
        } catch (err) {
            console.log(err, "Failed to delete the chat")
        }
    };
    const handleEdit = (id, currentMsg) => {
        setEditId(id);
        setEditMsg(currentMsg);
    };
    const handleUpdate = async (id) => {

        try {
            const response = await updatedChat(id, editMsg);
            await getChatData();
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat._id === id ? response : chat
                )
            );

            setEditId(null);
            setEditMsg('');
        } catch (err) {
            console.error('Error updating message:', err);
        }
    };
    return (
        <>
            <Navbar />
            <div className="p-8 relative min-h-screen bg-blue-50">
                <h1 className="text-2xl font-bold mb-2">All Chats</h1>

                {/* Popup Form */}
                <div
                    className={`transition-all absolute z-10 duration-500 ease-in-out transform ${showForm ? 'translate-y-0 opacity-100' : '-translate-y-96 opacity-0'
                        } bg-white p-6 rounded-xl shadow-xl ml-[30%] max-w-md mx-auto`}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <i className="fa-solid fa-xmark cursor-pointer ml-96" onClick={() => {
                            setShowForm(false)
                        }}></i>
                        <input
                            type="text"
                            name="from"
                            placeholder="Who are you?"
                            value={formData.from}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300"
                            required
                        />
                        <textarea
                            name="msg"
                            placeholder="Type your message here"
                            value={formData.msg}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300"
                            required
                        />
                        <input
                            type="text"
                            name="to"
                            placeholder="Received by"
                            value={formData.to}
                            onChange={handleChange}
                            className="w-full p-2 rounded border border-gray-300"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* New Chat Button */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="mb-4 bg-blue-400 text-black px-4 py-2 rounded hover:bg-blue-200 cursor-pointer"
                >
                    New Chat
                </button>

                {/* Chat List */}
                <div className="flex flex-wrap gap-4">
                    {
                        chats
                            .map((chat) => (
                                <div key={chat._id} className="chat ...">

                                    <p className="text-sm mb-1">
                                        From: <i>{chat.from}</i>
                                    </p>

                                    <div className="msg bg-blue-500 text-white px-4 py-2 rounded-xl mb-2">
                                        {editId === chat._id ? (
                                            <>
                                                <textarea
                                                    value={editMsg}
                                                    onChange={(e) => setEditMsg(e.target.value)}
                                                    className="w-full text-white p-2 rounded mb-2 resize-none max-h-20 overflow-y-auto"
                                                />

                                                <button
                                                    className="bg-white text-blue-700 px-2 py-1 rounded mr-2  cursor-pointer"
                                                    onClick={() => handleUpdate(chat._id)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="bg-gray-200 text-black px-2 py-1 rounded  cursor-pointer"
                                                    onClick={() => setEditId(null)}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p>Message: {chat.msg}</p>
                                                <div className='mt-4'>
                                                    <button
                                                        className="neu-button text-[18px] text-[#4d4d4d] px-4 py-1 rounded-full bg-[#e0e0e0] border-[2px] border-[#cecece] shadow-inner hover:shadow-[inset_2px_2px_5px_#bcbcbc,inset_-2px_-2px_5px_#ffffff,2px_2px_5px_#bcbcbc,-2px_-2px_5px_#ffffff] focus:outline-none focus:shadow-[inset_2px_2px_5px_#bcbcbc,inset_-2px_-2px_5px_#ffffff,2px_2px_5px_#bcbcbc,-2px_-2px_5px_#ffffff] transition-all duration-200 ease-in-out m-2 cursor-pointer"
                                                        onClick={() => handleEdit(chat._id, chat.msg)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className="neu-button text-[18px] text-[#4d4d4d] px-4 py-1 rounded-full bg-[#e0e0e0] border-[2px] border-[#cecece] shadow-inner hover:shadow-[inset_2px_2px_5px_#bcbcbc,inset_-2px_-2px_5px_#ffffff,2px_2px_5px_#bcbcbc,-2px_-2px_5px_#ffffff] focus:outline-none focus:shadow-[inset_2px_2px_5px_#bcbcbc,inset_-2px_-2px_5px_#ffffff,2px_2px_5px_#bcbcbc,-2px_-2px_5px_#ffffff] transition-all duration-200 ease-in-out cursor-pointer" onClick={() => handleDelete(chat._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <p className="text-sm mb-1">
                                        Received by: <i>{chat.to}</i>
                                    </p>
                                    <p className="text-xs">
                                        Time: {new Date(chat.created_at).toLocaleTimeString()}
                                    </p>
                                    <p className="text-xs">
                                        Date: {new Date(chat.created_at).toLocaleDateString()}
                                    </p>
                                    <hr className="my-2" />
                                </div>
                            ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Chat;


