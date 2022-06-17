import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios'
import './ChatBox.css';
import io from "socket.io-client"
import Lottie from "react-lottie"
import {ChatState} from '../../Context/ChatProvider';

// Material ui imports
import { FormControl,Input } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

// Chakra UI imports
import { ChakraProvider } from "@chakra-ui/react";


// Import components
import useMediaQuery from "../miscelleneus/useMediaQuery";
import ScrollableChat from '../miscelleneus/ScrollableChat';
import UpdateGroupModal from '../miscelleneus/UpdateGroupModal';


// Socket IO 
const ENDPOINT = "https://ryuzaki-chatapp.herokuapp.com";
var socket,selectedChatCompare;

const ChatBox = () => {

  // UseState Declarations

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false)
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // ContextAPI hook
  const {user,fetchAgain,setFetchAgain,selectedChat,setSelectedChat,notification, setNotification}  = ChatState();

  // For website responsive - media queries
  const matches650 = useMediaQuery("(max-width: 650px)");

  // Typing animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: require("../animations/chat-typing.json"),
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }
  // fetchMessages of selected chat
  const fetchMessages = async () => {
    if(!selectedChat) return;

    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };

      setLoading(true);
      const res = await axios.get(`http://localhost:8000/api/message/${selectedChat._id}`, config);
      console.log(messages);
      setMessages(res.data);
      setLoading(false);

      socket.emit("join chat",selectedChat._id);


    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  }


  useEffect(() => {
    fetchMessages();
    // to keep backup of selected chat
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat])
  

  // Socket IO logic


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup",user);
    socket.on("connected",()=> setSocketConnected(true) )
    socket.on("typing",()=> setIsTyping(true))
    socket.on("stop typing",()=> setIsTyping(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 

  useEffect(() => {
    socket.on("message recieved",(newMessageRecieved)=>{
      if(!selectedChatCompare || 
        selectedChatCompare._id !== newMessageRecieved.chat._id){
          // give notification
          if(!notification.includes(newMessageRecieved)){
            setNotification([newMessageRecieved,...notification]);
            setFetchAgain(!fetchAgain);
          }
        }
        else{
          setMessages([...messages,newMessageRecieved]);
        }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  

  const sendMessage = async (event) => {

    if(event.key === "Enter" && newMessage){
      socket.emit("stop typing",selectedChat?._id)
      if(!event.target.value){
        alert("Please select a valid message");
        return;
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.token}`
          },
        };

        setNewMessage("");

        const res = await axios.post("http://localhost:8000/api/message",
          {
            content:newMessage,
            chatId:selectedChat?._id,
          },
          config
        );

        console.log(res.data)

        socket.emit("new message",res.data);

        setMessages([...messages,res.data]);
         
      } catch (error) {
        alert(error.message);
        console.log(error.message);
      }

    }
  }

  
  const typingHandler = async (event) => {
    setNewMessage(event.target.value);

    if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      socket.emit("typing",selectedChat?._id);
    }

    let lastTypingTime = new Date().getTime();

    var timerLength = 3000;
    setTimeout(() =>{
      var timeNow = new Date().getTime();
      var timeDif = timeNow - lastTypingTime;


      if(timeDif >= timerLength && typing){
        socket.emit("stop typing",selectedChat?._id);
        setTyping(false);
      }
    },timerLength);

  }


  return (
    <>
      {matches650 && !selectedChat?
        <></>
        :
          <div className="chatbox" 
                style={matches650 ? {width: "90%",marginLeft: "5%"}:{}}>

          {
            !selectedChat ?
            (
              <div style={{display: 'flex', justifyContent: 'center',alignItems: 'center',height: '100%',width: '100%'}}>
                <p style={{fontSize: '3vw',fontWeight: '100'}}> Click on a user to start chatting </p>
              </div>
            )
            :
            (
              <div className="chatbody">
              
                <div className="chatbox-header">
                  {matches650&&<div className="back-arrow" onClick={()=>{
                    setSelectedChat();
                  }}>
                    <ArrowBackIcon />
                  </div>}
                  <h1 style={{fontWeight:"300",fontSize:"1.8rem",marginLeft:matches650?"0rem":"4rem"}}>
                    {!selectedChat?.isGroupChat?
                        selectedChat?.users[0]?._id ===user?._id ? selectedChat?.users[1].name : selectedChat?.users[0].name
                          : 
                        selectedChat.chatName
                    }
                  </h1>  

                  {!selectedChat?.isGroupChat?
                        <InfoIcon style={{marginRight:"3rem",cursor: "pointer"}}/>
                          : 
                          <ChakraProvider>
                            <UpdateGroupModal fetchMessages={fetchMessages}>
                              <EditIcon style={{marginRight:"3rem",cursor: "pointer"}} />
                            </UpdateGroupModal>
                          </ChakraProvider>
                    }
                  
                </div>
                <div className="chatbox-body">
                  {
                    loading ?
                    (
                        <CircularProgress color="inherit" thickness="1.5" style={{marginTop:"23%",height:"5rem",width:"5rem"}} />
                    ) :
                    (
                      <div className="message-area">
                        <ScrollableChat messages={messages}/>
                      </div>
                    )
                }

                {isTyping ?<div className="typing-animation" >
                    <Lottie
                      options={defaultOptions}
                      width={80}
                      style={{marginBottom:"15",marginLeft:"1"}}
                  />
                  </div>:<></>}
                  
                  <div className="message-input">
                  
                    <FormControl 
                        onKeyDown={sendMessage} 
                        style={{
                          width:matches650? "65%":"85%",
                          backgroundColor:"#D8DBE3",
                          borderRadius:"1rem",
                          padding:"0.6rem",
                          paddingLeft:"2rem",
                          height:matches650?"2rem":"3rem",
                        }}>
                          
                      <Input 
                          id="my-input" 
                          aria-describedby="my-helper-text"
                          required={true}
                          onChange={typingHandler}
                          disableUnderline={true}
                          placeholder="Enter a message..."
                          value={newMessage}
                          />
                    </FormControl>
                    <div className="send-btn">
                      <SendRoundedIcon style={{paddingLeft:"2px", color:"white"}} onClick={sendMessage}/>
                    </div>
                    

                  </div>
                  
                </div>
              </div>
            )
          
          }
          </div>
      
      }
    </>
    


  )
}

export default ChatBox