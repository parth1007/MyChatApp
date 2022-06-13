import * as React from 'react';
import {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {ChatState} from '../../Context/ChatProvider';

import useMediaQuery from "./useMediaQuery";


export default function ChatListObject(props) {

  const matchesmax900 = useMediaQuery("(max-width: 900px)");
  const matchesmax650 = useMediaQuery("(max-width: 650px)");
  const matchesmax600 = useMediaQuery("(max-width: 600px)");

  const {user,selectedChat, setSelectedChat,chats, setChats}  = ChatState();

  const {chatObject,loggedUser,backgroundColor} = props;

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
          primary={!chatObject.isGroupChat?
            otherUser.name : chatObject.chatName
              }

          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline',fontSize:"0.8rem" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                  {chatObject?.latestMessage && (
                  <pre fontSize="xs">
                    {chatObject.latestMessage.sender.name} : 
                    {chatObject.latestMessage.content.length > 50
                      ? chatObject.latestMessage.content.substring(0, 51) + "..."
                      : chatObject.latestMessage.content}
                  </pre>
                )}
              </Typography>

            </React.Fragment>
          }
        />

      </ListItem>

    </List>
  );
}
