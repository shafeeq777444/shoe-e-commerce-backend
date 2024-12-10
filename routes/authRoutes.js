const express=require('express')
const {register,login } =require('../controllers/authController')
const router=express.Router()

// @route  POST/register
router.post('/register',register)

// @route   POST /login
router.post('/login',login)

module.exports=router;