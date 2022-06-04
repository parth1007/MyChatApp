import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const UserListItem = ({resUser,handleChatClick}) => {
  return (
    <List sx={{ cursor: "pointer",width: '90%',padding:"0px", maxWidth: 360, bgcolor: 'background.paper', marginTop:"3px",marginLeft:"5%", borderRadius:"5px" }}
        onClick={handleChatClick}    
    >
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={resUser.name}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline',fontSize:"0.8rem" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
             Email
            </Typography>
            {" : "}{resUser.email}
          </React.Fragment>
        }
      />
    </ListItem>
  </List>
  )
}

export default UserListItem