// Frontend code (React)

import React, { useEffect, useState } from 'react';
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import "../styled/UserBox.css";
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { useDispatch} from 'react-redux';
import { chatUser, storeChat } from '../store/chatSlice';

const UserBox = () => {
  const [userData, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();



  const fetchUser = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/user/fetch-user-All");
      setUser(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const initiateChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };
      const currentUser = "65cf1a517b6e8fdad7a02bc8";
      const data = {
        currentUser: currentUser,
        userId: userId
      };
      await axios.post(`http://localhost:5000/api/chat`, data, config);

      fetchChatById(userId);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchChatById = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };
      const currentUser = "65cf1a517b6e8fdad7a02bc8"; 
      const data = {
        currentUser: currentUser,
        userId: userId
      };
      const { data: chatData } = await axios.post(`http://localhost:5000/api/chat`, data, config);
      dispatch(storeChat(chatData));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const filteredUsers = userData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const userChat = (value) => {
    dispatch(chatUser(value));
    initiateChat(value._id);
  }

  return (
    <div className="UserBox_section">
      {/* Chat Header */}
      <div className="Header__section">
        <Box className="Header_Item">
          <IconButton>
            <Avatar>N</Avatar>
          </IconButton>
          <Typography component="p">Ali</Typography>
        </Box>
        <Box>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Box>
      </div>
      {/* User Search */}
      <div className="Search_section">
        <div className="Search">
          <input
            type="text"
            placeholder="Search the User"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      {/* Chat Body */}
      <div className="Body__section">
        {filteredUsers.map((value, index) => (
          <div className="Body_Item" key={index}>
            <Box className="person_message" onClick={() => { userChat(value); }}>
              <IconButton>
                <Avatar src={value.pic} />
              </IconButton>
              <Typography component="p">{value.name}</Typography>
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBox;
