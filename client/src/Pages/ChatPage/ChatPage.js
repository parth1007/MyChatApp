import React from 'react'
// import axios from 'axios';
import {useState,useEffect} from 'react';
import Topbar from '../../components/Topbar/Topbar';
import SideBox from '../../components/SideBox/SideBox';
import ChatBox from '../../components/ChatBox/ChatBox';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

import {ChatState} from '../../Context/ChatProvider';


const ChatPage = () => {
    // const [chats,setChats] = useState([]);
    const {user} = ChatState();
    const {toggleDrawer,setToggleDrawer}  = ChatState();


    // const fetchChats = async () => {
    //     const data = await axios.get('/api/chats');
    //     console.log(data.data);
    //     setChats(data.data);
    // }
    useEffect(() => {
      // fetchChats();
      setToggleDrawer(false);
    }, [])
    
    

  return (
    <div style={{display:"flex",flexDirection:"column",width:"100%",backgroundColor:"#cfcfcf",position: "relative"}}>
        <Topbar/>
        {toggleDrawer && <SideDrawer/>}
        <div className="chat_container" style={{display:"flex",flexDirection:"row",width:"100%"}}>
          <SideBox/>
          <ChatBox/>
        </div>
    </div>
  )
}

export default ChatPage