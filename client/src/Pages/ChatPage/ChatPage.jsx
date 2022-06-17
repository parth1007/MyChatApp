import React from 'react'
import './ChatPage.css'
import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

// Import Components
import Topbar from '../../components/Topbar/Topbar';
import SideBox from '../../components/SideBox/SideBox';
import ChatBox from '../../components/ChatBox/ChatBox';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

// Import Context api
import {ChatState} from '../../Context/ChatProvider';


const ChatPage = () => {

    const {user,toggleDrawer}  = ChatState();
    const navigate = useNavigate();

    useEffect(() => {
      if (localStorage.getItem("userInfo") === null) {
        navigate("/login");
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]) 


  return (
    <div className="chat-page">
        {user && <Topbar/>}
        {user && (toggleDrawer && <SideDrawer/>)}

        {/* display overlay if side drawer is active */}
        {toggleDrawer && <div className="overlay"></div>}
          <div className="chat_container">
            
              {user && <SideBox/>}
              {user && <ChatBox/>}
          
        </div>
    </div>
  )
}

export default ChatPage
