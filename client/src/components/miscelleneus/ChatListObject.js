import * as React from 'react';
import {ChatState} from '../../Context/ChatProvider';
import useMediaQuery from "./useMediaQuery";

// MUI Imports
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';



export default function ChatListObject(props) {

  // For website responsive - media queries
  const matchesmax900 = useMediaQuery("(max-width: 900px)");
  const matchesmax650 = useMediaQuery("(max-width: 650px)");
  // const matchesmax600 = useMediaQuery("(max-width: 600px)");


  const {user,selectedChat, setSelectedChat}  = ChatState();

  const {chatObject,backgroundColor} = props;

  const activateChat = async () => {
    await setSelectedChat(chatObject);
    console.log(selectedChat);
    console.log(selectedChat?.latestMessage.content);
  }

  const otherUser = chatObject.users[0]?._id ===user?._id ? chatObject.users[1] : chatObject.users[0] ;
  

  return (
    <List 
          onClick={activateChat}
          sx={{ width: '95%',
                padding:"0px", 
                maxWidth: 360, 
                bgcolor: backgroundColor, 
                // marginTop:"3px",
                marginLeft:"1%", 
                borderRadius:"5px",
                cursor: "pointer",
              }}
          >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp"
                  src={chatObject.isGroupChat? "/static/images/avatar/1.jpg" : otherUser.profilePic}
                  sx={matchesmax900 ? matchesmax650? { height: '2.7rem', width: '2.7rem',marginRight:"1.5vw" }:{ height: '5vw', width: '5vw' }:{}}
                />
        </ListItemAvatar>
        
        <ListItemText
          primary={
            <Typography sx={{ display: 'inline',fontSize:"1rem" }} component="span" variant="body2" color="#000000">
                {!chatObject.isGroupChat?
                  otherUser.name : chatObject.chatName
                }
            </Typography>
          }

          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {chatObject?.latestMessage && 
                  (
                    <p style = {{fontSize:"0.8rem",color:"#424242"}}>
                      {chatObject.latestMessage.sender.name === user?.name ? "You" : chatObject.latestMessage.sender.name} : 
                      {chatObject.latestMessage.content.length > 50
                        ? " " + chatObject.latestMessage.content.substring(0, 51) + "..."
                        : " " + chatObject.latestMessage.content}
                    </p>
                  )
                } 
              </Typography>

            </React.Fragment>
          }
        />

      </ListItem>

    </List>
  );
}
