import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockClosedIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {useContext, useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import login from "../../api/account/login.ts";
import {getUserInfo} from "../../api/account/info.ts";
import UserInfoContext from "../../contexts/UserInfoContext.tsx";

const LoginForm = () => {
  const [locked, setLocked] = useState<boolean>(true);
  const [waiting, setWaiting] = useState<boolean>(false);
  const navigate = useNavigate();
  const {userInfo, setUserInfo} = useContext(UserInfoContext);

  useEffect(() => {
    getUserInfo().then(info => {
      if (setUserInfo && userInfo != info) {
        setUserInfo(info);
        navigate("/");
      }
    });
  }, []);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent sending multiple requests
    if (waiting) return;
    setWaiting(true);
    // prevent default behaviour
    event.preventDefault();
    // get form data
    const data = new FormData(event.currentTarget);
    // send request to server
    let response = await login(data.get('email') as string, data.get('password') as string);
    // check for response and validate it
    if (response) {
      // unlock
      setLocked(false);
      // go to default page
      navigate("/");
    } else {
      // if error was caught in login api
      alert("The server might be offline. Please try again later.");
    }
    // stop waiting
    setWaiting(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgColor: 'secondary.main'}}>
          {!locked ? <LockOpenIcon/> : <LockClosedIcon/>}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus={true}
          />
          <TextField
            margin="normal"
            required={true}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            disabled={waiting}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/*todo: add forgot password page*/}
              <Link component={RouterLink} to="/iforgor" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;