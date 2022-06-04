import React from 'react'
import './SideBox.css'
import AddIcon from '@mui/icons-material/Add';
import Button from '@material-ui/core/Button';
import ChatListObject from '../miscelleneus/ChatListObject';
import Divider from '@mui/material/Divider';
import {useState,useEffect} from 'react';
import {ChatState} from '../../Context/ChatProvider';
import axios from "axios";

const SideBox = () => {

  const [loggedUser, setLoggedUser] = useState();
  const {user,toggleDrawer,setToggleDrawer,selectedChat, setSelectedChat,chats, setChats}  = ChatState();

  const userInfo =  JSON.parse(localStorage.getItem("userInfo"));



  const fetchChats = async () => {
    
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.get('http://localhost:8000/api/chats', config);
      console.log(res.data);
      // setChats(res.data);


    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  
    
  }, [])
  


  return (
    <div className="sidebox">
      <div className="sidebox-header">
        <div className="sidebox-header-title">
          My Chats
        </div>
        <Button variant="outlined" style = {{backgroundColor:"#e1e1e1"}}>
          New Group Chat      
          <AddIcon/>
        </Button>
      </div>

      <div className="chatlist">
        <ChatListObject userName="Parth Soni" senderName="farza" msg="Great work there!!"/>
        <Divider variant="inset" />


          {/* {
            chats?.map((resUser) => (
              <UserListItem key={resUser._id}
              resUser={resUser}
                handleChatClick={() => {accessChat(resUser._id)}}/>
            ))
          } */}

 {/* <ChatListObject userName={listItem.name} senderName="Email" msg={listItem.email}/> */}

        
      </div>
    </div>
  )
}

export default SideBox