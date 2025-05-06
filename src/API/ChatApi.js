import axios from "axios";

export const chatApi = async () => {
  try {
    const token = localStorage.getItem("token");

    const resData = await axios.get("http://localhost:8080/chats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return resData.data.chats;
  } catch (err) {
    console.log(err, "Failed to fetch the data");
  }
};

export const newChatApi = async (newChat) => {
  try {
    let postChats = await axios.post("http://localhost:8080/chats", newChat);
    return postChats.data.chat;
  } catch (err) {
    console.log(err, "Failed to post the data");
  }
};

export const deleteChat = async (id) => {
  try {
    let chatDelete = await axios.delete(`http://localhost:8080/chats/${id}`);
    return chatDelete.data.message;
  } catch (err) {
    console.log(err, "Failed to delete the chat");
  }
};

export const updatedChat = async (id, msg) => {
  try {
    let updateChat = await axios.put(`http://localhost:8080/chats/${id}`, {
      msg,
    });
    return updateChat.data.chat;
  } catch (err) {
    console.log(err, "Failed to update message");
  }
};
