// React Imports

import React from 'react'
import {useState,useEffect} from 'react';
import axios from "axios";


// Import Components

import ChatListObject from '../miscelleneus/ChatListObject';
import {ChatState} from '../../Context/ChatProvider';
import ChatLoading from '../miscelleneus/ChatLoading';
import GroupChatModal from '../miscelleneus/GroupChatModal';
import './SideBox.css'


// Material ui imports
import AddIcon from '@mui/icons-material/Add';
import Button from '@material-ui/core/Button';
import Divider from '@mui/material/Divider';
import { ChakraProvider } from "@chakra-ui/react";

const SideBox = () => {

  const [loggedUser, setLoggedUser] = useState();
  const {user,toggleDrawer,setToggleDrawer,selectedChat, setSelectedChat,chats, setChats,fetchAgain}  = ChatState();

  const userInfo =  JSON.parse(localStorage.getItem("userInfo"));



  const fetchChats = async () => {
    
    try {
      console.log("In Side box")
      // console.log(loggedUser)
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.get('http://localhost:8000/api/chat', config);
      console.log(res.data);
      setChats(res.data);


    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  
  }, [fetchAgain])

  const tempChatsFetching = async () => {
    try {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }
  


  return (
    <div className="sidebox">
      <div className="sidebox-header">
        <div className="sidebox-header-title">
          My Chats
        </div>
        <ChakraProvider>
          <GroupChatModal>
            <Button variant="outlined" style = {{backgroundColor:"#e1e1e1"}} onClick={tempChatsFetching}>
              New Group Chat      
              <AddIcon/>
            </Button>
          </GroupChatModal>
        </ChakraProvider>
      </div>

      {/* <div className="chatlist"> */}
        {/* <ChatListObject userName="Parth Soni" senderName="farza" msg="Great work there!!"/>
        <Divider variant="inset" /> */}

        {chats? (
          <div className="chatlist">
            {chats.map((chat) =>(
              // <ChatListObject userName={chat.userName} senderName={chat.senderName} msg={chat.msg}/>
        //  <ChatListObject userName="Parth Soni" senderName="farza" msg="Great work there!!"/>

              <ChatListObject 
                  key={chat._id} 
                  chatObject={chat} 
                  loggedUser = {user}
                  />
              ))}
          </div>
        ) :(
          <ChatLoading/>
        )}


      
    </div>
  )
}

export default SideBox