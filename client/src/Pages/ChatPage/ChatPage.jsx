import React from 'react'
import './ChatPage.css'


// Import Components
import Topbar from '../../components/Topbar/Topbar';
import SideBox from '../../components/SideBox/SideBox';
import ChatBox from '../../components/ChatBox/ChatBox';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

// Import Context API

const ChatPage = () => {

    const {user,toggleDrawer}  = ChatState();


  return (
    <div style={{display:"flex",flexDirection:"column",width:"100%",backgroundColor:"#D8DBE3",position: "relative"}}>
        {user && <Topbar/>}
        {user && (toggleDrawer && <SideDrawer/>)}
        {toggleDrawer && <div className="overlay"></div>}
          <div className="chat_container" style={{display:"flex",flexDirection:"row",width:"100%",height:"92vh"}}>
            
            {user && <SideBox/>}
            {user && <ChatBox/>}
          
        </div>
    </div>
  )
}

export default ChatPage


// https://dribbble.com/shots/16507884-Chatbot