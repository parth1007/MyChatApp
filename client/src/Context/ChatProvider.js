import React from 'react';

import { useContext,useState,useEffect,createContext } from "react";
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({children}) =>{

    // UseState Declarations

    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [fetchAgain,setFetchAgain] = useState(false);
    const [notification, setNotification] = useState([])
    const initial = JSON.parse(localStorage.getItem("userInfo"));
    const [user,setUser] = useState(initial); 

    const navigate = useNavigate();


    // Get user from local storage

    useEffect(() => {
      const userInfo =  JSON.parse(localStorage.getItem("userInfo"));
      
      setUser(userInfo);
      // console.log(userInfo);

      
    },[navigate])


    return(
        
        <ChatContext.Provider 
                value={{  user,setUser,
                          toggleDrawer, setToggleDrawer,
                          selectedChat, setSelectedChat,
                          chats, setChats,
                          fetchAgain,setFetchAgain,
                          notification, setNotification
                        }}>
                {children}
        </ChatContext.Provider>
    )
    
}

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;