import React, { useState, useEffect } from "react";
import {Container,Box, Typography, TextField, Button, Grid, ImageListItemBar} from "@mui/material"
import { Link, Navigate, useNavigate } from "react-router-dom";
import {  toast, ToastContainer } from "react-toastify";
import image from "../images/banner-img.jpg"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
// import {LoginSharp} from "@mui/icons-material"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //prevent login user to register
  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/")
    }
  },[navigate])


  const handleSubmit = async(e) => {
    e.preventDefault();
    const User = {
      email: email,
      password: password,
    };
    try {
      const {data} = await axios.post("/users/login",User);
      toast.success("Login Successfull", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem('user',JSON.stringify({...data.user,password:""}))
      // setTimeout(()=>navigate("/"),2000);
      navigate("/")
    } catch (error) {
      toast.error("Login Failed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div >
      <div className="login-page">
        <img className="animated-image" width={"50%"} style={{marginLeft:"100px"}} src={image} ></img>
        <Container sx={{backgroundColor:"#e8eaf6",borderRadius:"5px",border:"solid thin #abb9ff",boxShadow:"0 0 4px #abb9ff",marginRight:"100px"}}   component="main" maxWidth="xs">
          <Box
            sx={{
              margin:"10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography sx={{fontFamily:"Roboto, sans-serif",fontSize:"35px"}} component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:"#4353b2", }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/reset" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to={"/register"}  variant="body2">
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
        </Container>
      </div>
    </div>
  );
};

export default Login;
