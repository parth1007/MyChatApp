import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ChatLoading() {

  return (
    <Box sx={{ width: "90%", marginLeft:"5%",paddingTop:"1rem" }}>
      <Skeleton animation="wave" height={100} style={{marginTop:"-1rem"}} />
      <Skeleton animation="wave" height={100} style={{marginTop:"-1rem"}} />
      <Skeleton animation="wave" height={100} style={{marginTop:"-1rem"}} />
      <Skeleton animation="wave" height={100} style={{marginTop:"-1rem"}} />
      <Skeleton animation="wave" height={100} style={{marginTop:"-1rem"}} />
      <Skeleton animation="wave" height={100} style={{marginTop:"-1rem"}} />
    </Box>
  );
}

// Loading Chat Animation in side drawer while fetching data from server.