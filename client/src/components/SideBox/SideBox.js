import React from 'react'
import './SideBox.css'
import AddIcon from '@mui/icons-material/Add';
import Button from '@material-ui/core/Button';
import ChatListObject from '../miscelleneus/ChatListObject';
import Divider from '@mui/material/Divider';


const SideBox = () => {
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

        <ChatListObject userName="Parth Soni" senderName="farza" msg="Great work there!!"/>
        <Divider variant="inset" />

        <ChatListObject userName="Parth Soni" senderName="farza" msg="Great work there!!"/>
        <Divider variant="inset" />

        
      </div>
    </div>
  )
}

export default SideBox