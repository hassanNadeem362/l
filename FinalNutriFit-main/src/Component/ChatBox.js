import { Avatar, Box, IconButton, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import "../styled/ChatBox.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const ChatBox = () => {
  const { user, chat } = useSelector((state) => state.chat);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(message)

  const userData = Cookies.get("userInfo");
  let currentUser = userData ? JSON.parse(userData) : null;


 


  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        {
          senderId: currentUser._id,
          content: message,
          chatId: chat._id,
        },
        config
      );
      console.log(data)
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  const fetchMessage = async () => {
    try {
      if (!chat) return;
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/message/${chat._id}`,
        config
      );
      console.log("Fetched messages:", data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMessage()
  }, [chat])




  return (
    <div className="chatBox_section">

      {user ? (
        <>
          {/* ------------------------------ Header Section --------------------------- */}
          <div className="Header_section">
            <Box className="Header_item">
              <IconButton>
                <Avatar src={user.pic} />
              </IconButton>
              <Box className="Header_content">
                <Typography component="p">
                  {user.name}
                </Typography>
                <Typography component="span">
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </div>
          {/* ------------------------------ Body Section --------------------------- */}
          <div className="Body_section">
            {messages.map((message, index) => (
              message.chat.users.includes(user._id) && (
                <div className={`message ${message.sender._id === currentUser._id ? 'me' : 'receiver'}`} key={index}>
                  {message.content}
                </div>
              )
            ))}
          </div>
          {/* ------------------------------ Chat Section --------------------------- */}
          <div className="chat_section">
            <IconButton>
              <AddIcon />
            </IconButton>
            <input type="text" placeholder="Type a message" value={message} onChange={(e) => setMessage(e.target.value)} />
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </div>
        </>
      ) : (
        <Box>
          <Typography variant="h1" component="h2">
            Select a user to start chat
          </Typography>
        </Box>
      )}
    </div>
  )
}

export default ChatBox;
