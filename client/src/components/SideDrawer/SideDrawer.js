// React Imports

import React from 'react'
import {useState,useEffect,useRef} from 'react';
import axios from "axios";

// Import Components

import {ChatState} from '../../Context/ChatProvider';
import UserListItem from '../miscelleneus/UserListItem';
import ChatLoading from '../miscelleneus/ChatLoading';
// import ChatListObject from '../miscelleneus/ChatListObject';


// Material ui imports
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@material-ui/core/Button';
// import Divider from '@mui/material/Divider';
import './SideDrawer.css'




const SideDrawer = () => {

  // UseState Declarations

  const [search, setSearch] = useState();
  const [loading, setLoading] = useState(false);
  const [searchResult,setSearchResult] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);


  // ContextAPI hook
  const {user,
      toggleDrawer,setToggleDrawer,
      selectedChat, setSelectedChat,
      chats, setChats} 
    = ChatState();

    const userInfo =  JSON.parse(localStorage.getItem("userInfo"));

  // Function Declarations

  //  Fetching searched users from database

  const handleSearchSubmit =  async (e) => {
    if(!search){
      alert('Please enter the search term');
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
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

// Creating or accessing a chat with the clicked user

  const accessChat  = async (userId) => {
    try {

      setChatLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const res = await axios.post("http://localhost:8000/api/chat",{userId}, config);

      if(!chats.find((c) => c._id === res.data._id)) setChats([res.data,...chats]);

      setChatLoading(false);
      setSelectedChat(res.data);

      closeDrawer();
      console.log(chats);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
      alert("error in access chat")
    }
  }

  // Closing the drawer

  const closeDrawer = () => {
    setToggleDrawer(false);
  }

  // For auto closing of SideDrawer on clicking outside the box

  let drawerRef = useRef();
  useEffect(() => {

    if(toggleDrawer === true) {
        let handler = (event) => {
          if(!drawerRef.current.contains(event.target)){
            setToggleDrawer(false);
          }
        };
        document.addEventListener("mousedown",handler);

        return () => {
          document.removeEventListener("mousedown",handler);
        }
    }
  })




  return (
    <div className="side-drawer" ref={drawerRef}>
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