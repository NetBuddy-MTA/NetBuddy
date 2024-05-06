import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockClosedIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {useContext, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import signin, {LoginResponse} from "../../api/account/SignIn";
import UserInfoContext from "../../contexts/UserInfoContext.tsx";

const SignInForm = () => {
  const [locked, setLocked] = useState<boolean>(true);
  const [waiting, setWaiting] = useState<boolean>(false);
  const {setUserInfo} = useContext(UserInfoContext)
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent sending multiple requests
    if (waiting) return;
    setWaiting(true);
    // prevent default behaviour
    event.preventDefault();
    // get form data
    const data = new FormData(event.currentTarget);
    // send request to server
    let response = await signin(data.get('username') as string, data.get('password') as string);
    // check for response and validate it
    if (response) {
      console.log(response);
      // unlock
      setLocked(false);
      // login was successful
      const {userName, email} = response as LoginResponse;
      if (setUserInfo) setUserInfo({
        username: userName,
        email
      });
      // go to default page
      navigate("/");
    } else {
      // if error was caught in login api
      alert("An error occured while processing the request!");
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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

export default SignInForm;