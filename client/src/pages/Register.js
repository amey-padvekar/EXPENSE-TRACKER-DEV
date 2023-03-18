import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import registerImg from "../images/register.png";
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,}$/;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  //prevent login user to register
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    try {
      const { data, error } = await axios.post("/users/register", newUser);
      toast.success("Registration Successfull", {
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
    } catch (error) {
      // console.log(error.response.data.error.code)
      if (error.response.data.error.code === 11000) {
        toast.error("Email already registered", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Registration Failed", {
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
    }
  };

  return (
    <div>
      <div className="register-page">
        <img
          className="animated-image"
          width={"50%"}
          style={{ marginLeft: "100px" }}
          src={registerImg}
        ></img>
        <Container
          sx={{
            backgroundColor: "#eaf4fe",
            borderRadius: "5px",
            border: "solid thin #abb9ff",
            boxShadow: "0 0 4px #120878",
            marginRight: "100px",
          }}
          component="main"
          maxWidth="xs"
        >
          <Box
            sx={{
              margin: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontFamily: "Roboto, sans-serif", fontSize: "35px" }}
              component="h1"
              variant="h5"
            >
              REGISTER
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
                id="username"
                label="Username"
                name="username"
                onChange={(e) => {
                  const value = e.target.value;
                  setUsername(e.target.value);
                  if (!USERNAME_REGEX.test(value)) {
                    setUsernameError(true);
                  } else {
                    setUsernameError(false);
                  }
                }}
                error={usernameError}
                helperText={
                  usernameError
                    ? "Username must be at least 6 characters and start with an alphabet"
                    : ""
                }
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
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
                  const value = e.target.value;
                  setPassword(value);

                  if (value.length < 8) {
                    setPasswordError(true);
                  } else {
                    setPasswordError(false);
                  }
                }}
                error={passwordError}
                helperText={
                  passwordError ? "Password must be at least 8 characters" : ""
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#fd796d" }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
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
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default Register;
