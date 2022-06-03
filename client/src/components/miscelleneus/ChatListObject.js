import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function ChatListObject(props) {
  return (
    <List sx={{ width: '90%',padding:"0px", maxWidth: 360, bgcolor: 'background.paper', marginTop:"3px",marginLeft:"5%", borderRadius:"5px" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={props.userName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline',fontSize:"0.8rem" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {props.senderName}
              </Typography>
              {" : "}{props.msg}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
