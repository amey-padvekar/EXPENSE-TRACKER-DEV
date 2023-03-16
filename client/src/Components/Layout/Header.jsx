import React, { useEffect, useState } from 'react'
import {AppBar,Toolbar, IconButton, Typography, Button, Box, ListItem} from "@mui/material";
import {Home, Menu} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [loginUser, setLoginUser] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      setLoginUser(user);
    }
  },[])

  function logoutHandler(){
    localStorage.removeItem("user");
    toast.success("Logout Successfull", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar color='primary'  position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={()=>{ navigate("/") }}
          >
            <Home/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Expense Tracker
          </Typography>
          <Typography component={"span"}>
            <ListItem>
              <Typography style={{textDecoration:"none"}}  >{loginUser && loginUser.username}</Typography>
            </ListItem>
          </Typography>
          
          <Button sx={{m:2}} variant='outlined' color="inherit" onClick={logoutHandler} >Logout</Button>
          <Button variant='outlined' color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <ToastContainer/>
    </>
  );
}

export default Header