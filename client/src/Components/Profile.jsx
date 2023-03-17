import React, { useState, useEffect } from "react";
// import { makeStyles } from "@mui/styled-engine";
import {Avatar, Grid, TextField, Typography,Button} from "@mui/material"
import axios from "axios"
import {toast} from "react-toastify";

function Profile({handleConfirm, editState}) {
  const [user,setUser] = useState({});
  const [username, setUsername] = useState("");
  const [budget, setBudget] = useState("");
  const [mobileno, setMobileno] = useState("");
  

  useEffect(() => {
      const getUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        const {data} = await axios.post("/users/get-user",{userId: currentUser._id});
        localStorage.setItem("profileData",JSON.stringify({...data.user,password:""}))
      setUser(JSON.parse(localStorage.getItem("profileData")))
        
      } catch (error) {
        console.log(error)
      }
    };
    getUser();
    console.log(user)
  }, [editState]);

  //seting profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const profile = {
      username:username,
      budget: budget,
      mobile: mobileno,
    };
    try {
      const user = JSON.parse(localStorage.getItem("user"));
        await axios.post("/users/update-user", {
          payload: { ...profile },
          userId: user._id,
        });
        toast.success("Edit successful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      
    } catch (error) {
      console.log(error);
      toast.error("Transaction unsuccessful", {
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
    <div className="m-2">
      {!editState ? (
        <Grid
          container
          direction="column"
          
          alignItems="center"
        >
          <Avatar alt="User Avatar" src="#" />
          
          <Typography sx={{width:"50%"}} variant="h4">username: {user.username}</Typography>
          <Typography sx={{width:"50%"}} variant="subtitle1">email: {user.email}</Typography>
          <Typography sx={{width:"50%"}} variant="h6">
            Mobile No: {!user.mobile ? " - - " : user.mobile}
          </Typography>
          <Typography sx={{width:"50%"}} variant="body1">
            Current Budget: {!user.budget ? " - - " : user.budget}
          </Typography>
          <Typography sx={{width:"50%"}} variant="h6">Statistics</Typography>
          <Typography sx={{width:"50%"}} variant="body1">
            Created all: {new Date(user.createdAt).toLocaleDateString()}
            <br></br>
            Upadated at: {new Date(user.updatedAt).toLocaleDateString()}
          </Typography>
        </Grid>
      ) : (
        <Grid sx={{width:"40"}} container  direction="column" alignItems="center">
          <Avatar className="m-2" alt="User Avatar" src="#" />

          <TextField
            sx={{width:"50%"}}
            defaultValue={user.username}
            className="m-1"
            variant="standard"
            size="small"
            name="username"
            label="username"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
          ></TextField>

          <Typography sx={{width:"50%"}} className="m-1" variant="subtitle1">email: {user.email}</Typography>

          <TextField
            sx={{width:"50%"}}
            defaultValue={!user.mobile ? "" : user.mobile}
            variant="standard"
            size="small"
            name="mobile"
            label="mobileno"
            value={mobileno}
            onChange={(e)=>{setMobileno(e.target.value)}}
          />

          <TextField
          sx={{width:"50%"}}
            variant="standard"
            defaultValue={!user.budget ? 0 : user.budget}
            size="small"
            name="budget"
            label="budget"
            value={budget}
            onChange={(e)=>{setBudget(e.target.value)}}
          />

          <Typography sx={{width:"50%"}} variant="h6">Statistics</Typography>
          <Typography sx={{width:"50%"}} variant="body1">
            Created all: {new Date(user.createdAt).toLocaleDateString()}
            <br></br>
            Upadated at: {new Date(user.updatedAt).toLocaleDateString()}
          </Typography>
          <Button
          on
            onClick={(e) => {
              handleSubmit(e);
              handleConfirm();
            }}
          >
            Confirm
          </Button>
        </Grid>
      )}
    </div>
  );
}

export default Profile;
