const express = require("express");
const { loginController, registerController, resetController } = require("../controllers/userController");
const router = express.Router();
//routers
//Login
router.post("/login",loginController)

//Register
router.post("/register",registerController)

//reset
router.post("/reset-password",resetController)

//export
module.exports = router;