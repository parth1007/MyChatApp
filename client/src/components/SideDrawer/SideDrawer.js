import React from 'react'
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import './SideDrawer.css'
import Button from '@material-ui/core/Button';
import ChatListObject from '../miscelleneus/ChatListObject';
import UserListItem from '../miscelleneus/UserListItem';

import Divider from '@mui/material/Divider';
import {useState,useEffect} from 'react';
import {ChatState} from '../../Context/ChatProvider';
import axios from "axios";
import ChatLoading from '../miscelleneus/ChatLoading';

const SideDrawer = () => {

  const [search, setSearch] = useState();
  const [searchResult,setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  const {user,toggleDrawer,setToggleDrawer,selectedChat, setSelectedChat}  = ChatState();

  const closeDrawer = () => {
    setToggleDrawer(false);
  }

  const handleSearchSubmit =  async (e) => {
    if(!search){
      alert('Please enter a search term');
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.get(`http://localhost:8000/api/user?search=${search}`, config);
      
      setLoading(false);
      setSearchResult(res.data);
      console.log(res.data);
      console.log(searchResult);
    } catch (error) {
      console.log(error.message);
    }
  }

  const accessChat  = async (userId) => {
    try {
      setChatLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const res = await axios.post("http://localhost:8000/api/chat",{userId}, config);
      setChatLoading(false);
      setSelectedChat(res.data);
      document.getElementById("drawer-close-btn").click();
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
      alert(error)
    }
  }



  return (
    <div className="side-drawer">
      <div className="drawer-header">
          Search Users
          <CloseIcon id="drawer-close-btn" onClick = {closeDrawer} style={{cursor:"pointer"}}  />
       </div>
      <hr/>
      <div className="drawer-body">
        <div className="drawer-searchbox">
          <InputBase style={{backgroundColor:"#fff",border:"1px #c8c8c8 black",color:"black",marginLeft:"1rem"}}
             placeholder="Search User..."
             onChange={(e) => {setSearch(e.target.value)}}
             />
          <Button variant="outlined" onClick={handleSearchSubmit}>Go</Button>
        </div>

        {loading ? (
          <ChatLoading />
        ):(
      
          <div className="chatlist">
            {
            
            searchResult?.map((resUser) => (
              // <ChatListObject userName={listItem.name} senderName="Email" msg={listItem.email}/>
              <UserListItem key={resUser._id}
              resUser={resUser}
                handleChatClick={() => {accessChat(resUser._id)}}/>
            ))}

        </div>
        )
        }
      </div>
    </div>
  )
}

export default SideDrawer