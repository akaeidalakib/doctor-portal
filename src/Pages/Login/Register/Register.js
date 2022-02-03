import { Button, CircularProgress, Container, Grid, TextField, Typography, Alert } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from '../../../Hook/useAuth';
import login from "../../../images/login.png"
const Register = () => {
    const {user, registerUser, isLoading, authError } = useAuth();
    const [loginData, setLoginData] = useState({});
    const history = useHistory();
    const handleOnBlur = e => {
        e.preventDefault();
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(newLoginData);
    }

    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('password did not match')
            return;
        }
        alert("submitted");
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
  <Grid sx={{ mt: 8}}  item xs={12} md={6}>
  <Typography variant="body1" gutterBottom>
      Register</Typography>
      { !isLoading && <form onSubmit={handleLoginSubmit}>
      <TextField 
      sx={{width: '75%', m:1}}
      id="standard-basic" 
      name="name"
      onBlur={handleOnBlur}
      label="Your Name" 
      variant="standard" />
      <TextField 
      sx={{width: '75%', m:1}}
      id="standard-basic" 
      name="email"
      onBlur={handleOnBlur}
      label="Your mail" 
      variant="standard" />
      <TextField 
      sx={{width: '75%', m:1}}
      id="standard-basic" 
      name="password"
      onBlur={handleOnBlur}
      type="password"
      label="password" 
      variant="standard" />
      <TextField 
      sx={{width: '75%', m:1}}
      id="standard-basic" 
      name="password2"
      onBlur={handleOnBlur}
      type="password"
      label=" Retype password" 
      variant="standard" />
      <Button sx={{width: '75%', m:1}} type="submit" variant="contained">Register</Button>
                        <NavLink style={{ textDecoration: 'none' }} to="/login"><Button variant="text">Already Register? Please Login</Button></NavLink>
      </form>}
      {isLoading && <CircularProgress />}
      {user?.email && <Alert severity="success">This is a success alert — check it out!</Alert>}
      {authError && <Alert severity="error">{authError}!</Alert>}
  </Grid>
  <Grid item xs={12} md={6}>
    <img style={{width: "100%"}} src={login} alt="" />
  </Grid>
  </Grid>
  </Container>
    );
};

export default Register;