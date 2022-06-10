import * as React from 'react';
import {useState} from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {ChatState} from '../../Context/ChatProvider';


// TODO: Change color for selected chat

export default function ChatListObject(props) {

  const {user,selectedChat, setSelectedChat,chats, setChats}  = ChatState();

  const {chatObject,loggedUser,backgroundColor} = props;

  const activateChat = async () => {
    await setSelectedChat(chatObject);
    console.log(selectedChat);
  }
  

  return (
    <List 
          onClick={activateChat}
          sx={{ width: '95%',
                padding:"0px", 
                maxWidth: 360, 
                bgcolor: backgroundColor, 
                // marginTop:"3px",
                marginLeft:"2%", 
                borderRadius:"5px",
                cursor: "pointer"
              }}
          >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={!chatObject.isGroupChat?
            chatObject.users[0]?._id ===user?._id ? chatObject.users[1].name : chatObject.users[0].name 
            : chatObject.chatName
              }

          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline',fontSize:"0.8rem" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {user?.name}
              </Typography>
              {" : "}
              {chatObject?.isGroupChat?" true":"false"}
              {/* {chatObject.latestMessage && (
                  <pre fontSize="xs">
                    <b>{chatObject.latestMessage.sender.name} : </b>
                    {chatObject.latestMessage.content.length > 50
                      ? chatObject.latestMessage.content.substring(0, 51) + "..."
                      : chatObject.latestMessage.content}
                  </pre>
                )} */}
            </React.Fragment>
          }
        />

      </ListItem>

    </List>
  );
}
