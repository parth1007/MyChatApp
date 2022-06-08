import React from 'react'
// import {useEffect} from 'react';
import Topbar from '../../components/Topbar/Topbar';
import SideBox from '../../components/SideBox/SideBox';
import ChatBox from '../../components/ChatBox/ChatBox';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

import {ChatState} from '../../Context/ChatProvider';

// TODO: Improve Drawer and profile DropDown


const ChatPage = () => {

    const {user,toggleDrawer}  = ChatState();


  return (
    <div style={{display:"flex",flexDirection:"column",width:"100%",backgroundColor:"#cfcfcf",position: "relative"}}>
        {user && <Topbar/>}
        {user && (toggleDrawer && <SideDrawer/>)}
        <div className="chat_container" style={{display:"flex",flexDirection:"row",width:"100%"}}>
          
          {user && <SideBox/>}
          {user && <ChatBox/>}
        </div>
    </div>
  )
}

export default ChatPage