import { useContext } from "react";
import UserInfoContext from "../contexts/UserInfoContext.tsx";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Home = () => {
  const {userInfo} = useContext(UserInfoContext)
  
  return (
    <Stack direction="column">
      <Typography>
        {`Hello ${userInfo?.username}`}
      </Typography>
    </Stack>
  );
};

export default Home;