import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  ListItem,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import { Dialog,DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from "@mui/material";
import { Home,VerifiedUser, Menu, Settings, Logout, PersonAdd } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../Profile"
import axios from "axios";

const Header = () => {
  const [profileEdit,setProfileEdit] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = ()=>{
    setProfileEdit(true)
  }
  const handleConfirm = ()=>{
    setProfileEdit(false);
  }
  

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const { data } = await axios.post("/users/get-user", {
          userId: currentUser._id,
        });
        localStorage.setItem(
          "profileData",
          JSON.stringify({ ...data.user, password: "" })
        );
        // setUser(JSON.parse(localStorage.getItem("profileData")));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
    console.log("user updated in header")
    console.log(user);
  }, [profileEdit]);

  function logoutHandler() {
    localStorage.removeItem("user");
    localStorage.clear();
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
        <AppBar sx={{backgroundColor:"#03A9F4"}} position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Home />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Expense Tracker
            </Typography>
            <Typography component={"span"}>
              <ListItem>
                {/* <Link to="/profile">
                  <Typography style={{ textDecoration: "none" }}>
                    {loginUser && loginUser.username}
                  </Typography>
                </Link> */}
                <div class="dropdown">
                  <Button
                    sx={{
                      backgroundColor: "whitesmoke",
                      color: "ThreeDShadow",
                    }}
                    color="info"
                    className="btn btn-primary dropdown-toggle"
                    variant="filled"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {loginUser && loginUser.username}
                  </Button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link
                        sx={{ textDecoration: "none" }}
                        className="dropdown-item"
                        onClick={handleClickOpen}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        sx={{ textDecoration: "none" }}
                        onClick={logoutHandler}
                        className="dropdown-item"
                        to="/login"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </ListItem>
            </Typography>

            {loginUser === "" ? (
              <Button variant="outlined" color="inherit">
                Login
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
      </Box>
      <ToastContainer />
      <Dialog
        maxWidth="sm"
        fullWidth
        sx={{ borderRadius: "10px" }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle alignItems={"center"} sx={{ display: "flex" }}>
          <Typography variant="h4">My Profile</Typography>
        </DialogTitle>
        <DialogContent>
              <Profile handleConfirm={handleConfirm} editState={profileEdit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit} >Edit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Header;
