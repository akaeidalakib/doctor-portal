import { Button, Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../../Hook/useAuth';
import login from "../../../images/login.png"
const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, loginWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();
    // console.log(loginData);
    const handleOnChange = e => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        alert("submitted");
        loginUser(loginData.email, loginData.password, history, location);
        e.preventDefault();
    }
    const handleLoginGoogle = () => {
        loginWithGoogle(history, location);
    }
    return (
        <Container>
            <Grid container spacing={2}>
  <Grid sx={{ mt: 8}}  item xs={12} md={6}>
  <Typography variant="body1" gutterBottom>
      Login</Typography>
      <form onSubmit={handleLoginSubmit}>
      <TextField 
      sx={{width: '75%', m:1}}
      id="standard-basic" 
      name="email"
      onChange={handleOnChange}
      label="Your mail" 
      variant="standard" />
      <TextField 
      sx={{width: '75%', m:1}}
      id="standard-basic" 
      name="password"
      onChange={handleOnChange}
      type="password"
      label="password" 
      variant="standard" />
      <Button sx={{width: '75%', m:1}} type="submit" variant="contained">Login</Button>
       <NavLink style={{ textDecoration: 'none' }} to="/register"><Button variant="text">New User? Please Register</Button></NavLink>
       
      {isLoading && <CircularProgress />}
      {user?.email && <Alert severity="success">login success!</Alert>}
      {authError && <Alert severity="error">{authError}!</Alert>}
      </form>
      <p>---------------------</p>
      <Button onClick={handleLoginGoogle} variant="contained">Login With Google</Button>
  </Grid>
  <Grid item xs={12} md={6}>
    <img style={{width: "100%"}} src={login} alt="" />
  </Grid>
  </Grid>
  </Container>
    );
};

export default Login;