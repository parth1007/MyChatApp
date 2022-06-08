import React from 'react';

import { useContext,useState,useEffect,createContext } from "react";
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({children}) =>{

    // UseState Declarations

    // const [user, setUser] = useState();
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [fetchAgain,setFetchAgain] = useState(false);
    const [notification, setNotification] = useState([])

    const navigate = useNavigate();
    const initial = JSON.parse(localStorage.getItem("userInfo"));
    const [user,setUser] = useState(initial); 

    // Get user from local storage

    useEffect(() => {
        // console.log(pathname)
      const userInfo =  JSON.parse(localStorage.getItem("userInfo"));
      
      setUser(userInfo);
      console.log("I am in context file!!!");
      console.log(userInfo);
        try {
            console.log(userInfo.name);
        } catch (error) {
            console.log("I am in catch block, name not found");
        }
      
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