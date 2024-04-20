import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import signup from "../../api/Account/SignUp";

const LoginForm = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [waiting, setWaiting] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (success) {
      navigate("/login");
      alert("Account created successfully");
    }
  }, [success]);
  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // prevent sending multiple requests
    if (waiting) return;
    setWaiting(true);
    // prevent default behaviour
    event.preventDefault();
    // get form data
    const data = new FormData(event.currentTarget);
    // send request to server
    let response = await signup(
      data.get('username') as string, 
      data.get('email') as string,
      data.get('password') as string
    );
    
    // check for response and validate it
    if (response) {
      // login was successful
      setSuccess(true);
    }
    else {
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
        <Avatar sx={{ m: 1, bgColor: 'secondary.main'}}>
          <AccountCircleRoundedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
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
            sx={{ mt: 3, mb: 2 }}
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
              <Link component={RouterLink} to="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;