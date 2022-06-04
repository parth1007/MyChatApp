import { useContext,useState,useEffect,createContext } from "react";


const ChatContext = createContext("");

const ChatProvider = ({children}) =>{

    // UseState Declarations

    const [user, setUser] = useState();
    const [toggleDrawer, setToggleDrawer] = useState(false);
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])




    // Get user from local storage

    const pathname = window.location.pathname
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
      
    },[])


    return(
        
        <ChatContext.Provider value={{  user,setUser,
                                        toggleDrawer, setToggleDrawer,
                                        selectedChat, setSelectedChat,
                                        chats, setChats
                                        }}>
            {children}
        </ChatContext.Provider>
    )
    
}

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;