import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { ChatState } from "../../Context/ChatProvider";

import ScrollableFeed from "react-scrollable-feed";
const isSameSender = (messages,msg,index,userId) =>{
     return (
         index < messages.length - 1 &&
         (messages[index + 1].sender._id !== msg.sender._id || 
            messages[index + 1].sender._id === undefined) &&
            messages[index].sender._id !== userId
        );
}

const isLastMessage = (messages,index,userId) =>{
    return(
        index === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    ) 
}

const isSameSenderMargin = (messages, msg, index, userId) => {
    // console.log(i === messages.length - 1);
  
    if (
      index < messages.length - 1 &&
      messages[index + 1].sender._id === msg.sender._id &&
      messages[index].sender._id !== userId
    )
      return 33;
    else if (
      (index < messages.length - 1 &&
        messages[index + 1].sender._id !== msg.sender._id &&
        messages[index].sender._id !== userId) ||
      (index === messages.length - 1 && messages[index].sender._id !== userId)
    )
      return 0;
    else return "auto";
};

const isSameUser = (messages, m, i) => {
    return i > 0 && messages[i - 1].sender._id === m.sender._id;
};





const ScrollableChat = ({messages}) => {


    const { user } = ChatState();

  return (

        <ScrollableFeed>
            {messages &&
             messages.map((msg,index) => (
                <div style={{display: 'flex'}} key={msg._id}>
                    {
                        (isSameSender(messages,msg,index,user._id) || 
                        isLastMessage(messages,index,user._id)) && (
                            <Tooltip 
                                title={msg.sender.name}
                                placement="bottom-start"
                                arrow
                            >
                                <Avatar 
                                    alt={msg.sender.name} 
                                    src={msg.sender.profilePic}
                                    cursor="pointer"
                                />
                            </Tooltip>
                        )}
                    <span style={{
                            backgroundColor: `${
                                msg.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                            }`,
                            marginLeft: isSameSenderMargin(messages, msg, index, user._id),
                            marginTop: isSameUser(messages, msg, index, user._id) ? 3 : 10,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                        }}>
                        {msg.content}
                    </span>

                </div>

             )
            )}

        </ScrollableFeed>

  )
}

export default ScrollableChat