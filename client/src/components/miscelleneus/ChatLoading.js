import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ChatLoading() {
  return (
    <Box sx={{ width: "90%", marginLeft:"5%" }}>
      <Skeleton animation="wave" height={80} />
      <Skeleton animation="wave" height={80} />
      <Skeleton animation="wave" height={80} />
      <Skeleton animation="wave" height={80} />
      <Skeleton animation="wave" height={80} />
      <Skeleton animation="wave" height={80} />

    </Box>
  );
}