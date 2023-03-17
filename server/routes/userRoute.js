const express = require("express");
const { loginController, registerController, resetController, userUpdateController, getUserController } = require("../controllers/userController");
const router = express.Router();
//routers
//Login
router.post("/login",loginController)

//Register
router.post("/register",registerController)

//reset
router.post("/reset-password",resetController)

//update
router.post("/update-user",userUpdateController)

//getuser
router.post("/get-user",getUserController);
//export
module.exports = router;