import { useContext,useState,useEffect,createContext } from "react";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext("");

const ChatProvider = ({children}) =>{

    // const navigate = useNavigate();
    
    const [user, setUser] = useState();
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState()
    useEffect(() => {
      const userInfo =  JSON.parse(localStorage.getItem("userInfo"));
      
      

      setUser(userInfo);
      console.log("I am in context file!!!");
      console.log(userInfo);
    //   if(userInfo)
    try {
        console.log(userInfo.name);
    } catch (error) {
        console.log("I am in catch block, name not found");
    }
      
        // if(!userInfo){
            
            // navigate("/login");
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [navigate])
    },[])

    return(
        
        <ChatContext.Provider value={{user,setUser,toggleDrawer, setToggleDrawer,selectedChat, setSelectedChat,chats, setChats}}>
            {children}
        </ChatContext.Provider>
    )
    
}

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;