//import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import UserInfoContext from '../contexts/UserInfoContext.tsx';

const Home = () => {
  //const { userInfo } = useContext(UserInfoContext);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="30vh">
      <Typography variant="h3" component="h1">
        Welcome!
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        NetBuddy is here to help
      </Typography>
    </Box>
  );
};

export default Home;