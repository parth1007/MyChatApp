import React from 'react'
import {useState,useEffect} from 'react';
import axios from "axios";
import './SideBox.css'

// Import Components

import ChatListObject from '../miscelleneus/ChatListObject';
import {ChatState} from '../../Context/ChatProvider';
import ChatLoading from '../miscelleneus/ChatLoading';
import GroupChatModal from '../miscelleneus/GroupChatModal';
import useMediaQuery from "../miscelleneus/useMediaQuery";


// Material UI imports
import AddIcon from '@mui/icons-material/Add';
import Button from '@material-ui/core/Button';

// Chakra UI import
import { ChakraProvider } from "@chakra-ui/react";



const HOST = "https://ryuzaki-chatapp.herokuapp.com";



const SideBox = () => {

  // UseState Declarations
  // eslint-disable-next-line no-unused-vars
  const [loggedUser, setLoggedUser] = useState();

  // ContextAPI hook
  const {user,selectedChat,chats, setChats,fetchAgain}  = ChatState();

  // const userInfo =  JSON.parse(localStorage.getItem("userInfo"));

  // For website responsive - media queries
  const matches900 = useMediaQuery("(max-width: 900px)");
  const matches650 = useMediaQuery("(max-width: 650px)");


  // Fetch chats for the currently logged in user
  const fetchChats = async () => {
    try {
      console.log("In Side box")
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const res = await axios.get(`${HOST}/api/chat`, config);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <>

    {matches650 && selectedChat ?
      <></>:

        <div className="sidebox" 
              style={matches650 ? {width: "80%",marginLeft: "10%"}:{}}
            >
              <div className="sidebox-header">

                <ChakraProvider>
                  <GroupChatModal>
                    <Button variant="outlined" 
                            onClick={tempChatsFetching} 
                            style={{
                                    backgroundColor: "#ffffff",
                                    height:"90%",
                                    padding: "0.6rem 1.3rem",
                                    fontSize:matches900 ? matches650 ? "1.1rem": '2vw' :"1.1vw",
                                    width:"100%",
                                    border:"none",
                                    borderRadius:"1rem",
                                    }}  >
                      Create A New Group 
                      <AddIcon style={{marginLeft:"0.9rem",height:"90%"}}/>
                    </Button>
                  </GroupChatModal>
                </ChakraProvider>
              </div>

                {chats? 
                  (
                    <div className="open-chatlist">
                      {chats.map((chat) =>(
                        <>
                            <ChatListObject 
                                key={chat._id} 
                                chatObject={chat} 
                                loggedUser = {user}
                                backgroundColor={selectedChat === chat ? "#5997f2" : "#ffffff"}
                            />
                            <hr style={{width:"82%",marginLeft:"15%"}}/>
                        </>
                        ))}
                    </div>
                  ) 
                  :
                  (
                    <ChatLoading/>
                  )
                }

        </div>
    }
    </>
  )
}

export default SideBox;