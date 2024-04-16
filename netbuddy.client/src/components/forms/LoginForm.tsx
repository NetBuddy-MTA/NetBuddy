﻿import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockClosedIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {login} from "../../api/auth/userAuth.ts";

const LoginForm = () => {
  const [locked, setLocked] = useState<boolean>(true);
  const [waiting, setWaiting] = useState<boolean>(false);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setWaiting(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let response = await login(data.get('username') as string, data.get('password') as string);
    if (response instanceof Response) {
      const json = await response.json();
      if (json as {UserName: string, Email: string, Token: string}) {
        setLocked(false);
        // todo: store username and email for view and token for authentication
      }
    }
    else {
      alert("An error occured while processing the request!");
    }
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
          {!locked ? <LockOpenIcon/> : <LockClosedIcon/>}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
              <Link href="/iforgor" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
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