import React from 'react';
import './ChatBox.css';
import EditIcon from '@mui/icons-material/Edit';


const ChatBox = () => {
  return (
    <div className="chatbox">
      <div className="chatbox-header">
        <h1 style={{fontWeight:"300",marginLeft:"3rem"}}>Andrej Karpathy</h1>  
        <EditIcon style={{marginRight:"3rem"}} />
      </div>
      <div className="chatbox-body">
        
      </div>
    </div>
  )
}

export default ChatBox