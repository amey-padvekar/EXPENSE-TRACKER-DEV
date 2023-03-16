import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  
} from "@mui/material";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [error,setError] = useState(false);
    const [email,setEmail] = useState("");
    const [oldPassword, setOldPassword] =useState("");
    const [newPassword, setNewPassword] =useState("");
    const [confirmPassword, setConfirmPassword] =useState("");
    function handleSubmit(event){
        event.preventDefault()

        setOpen(true)
    }

    const handleReset = async(event)=>{
        event.preventDefault()
        try {
            await axios.post("users/reset-password/",{email:email, newpassword:newPassword})
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
              navigate("/login")
            
        } catch (error) {
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
            navigate("/reset")
        }

    }

    function handleClose(){
        setOpen(false)
    }

  return (

    

    <>
    <div className="register-page">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            onSubmit={(event)=>{handleSubmit(event)}}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="currentpassword"
              label="Current Password"
              name="currnetpassword"
              onChange={(e) => {
                setOldPassword(e.target.value)
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="newpassword"
              label="New Password"
              name="newpassword"
              error={error}
              onChange={(e) => {
                setNewPassword(e.target.value)
                if(confirmPassword != e.target.value){
                    setError(true)
                }
                else{
                    setError(false)
                }
              }}
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm"
              label=" Confirm Password"
              type="password"
              id="confirm"
              autoComplete=""
              error={error}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if(newPassword != e.target.value){
                    setError(true);
                }
                else{
                    setError(false);
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  Back
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
      <Dialog width="sm" open={open} onClose={handleClose} >
        <DialogTitle>Verify Email</DialogTitle>
        <DialogContent  >
              <Box

                component="form"
                className="mt-3"
                onSubmit={(e) => {
                  handleReset(e);
                }}
              >
                <Typography className="mt-2 mb-2" >Enter registered email</Typography>
                <TextField
                  required
                  fullWidth
                  size="medium"
                  margin="none"
                  id="email"
                  label="email"
                  name="email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  type="email"
                  autoFocus
                  style={{ flexGrow: "1" }}
                />


                <Button
                  type="submit"
                  
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Continue
                </Button>
              </Box>
            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
      </Dialog>
    </div>
  </>
  )
}

export default ResetPassword