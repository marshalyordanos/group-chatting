const express = require("express");
const User = require("./userModel") 
const router = express.Router();
const { signup, login } = require("./userController");




router.route('/signup').post(signup)


router.route('/login').post(login)





module.exports = router