const asycHandler=require('../utils/asyncHandler')
const {registerUser,loginUser}=require('../services/authService')
// @route   POST /register
// @desc    Register a new user
exports.register=asycHandler(async(req,res)=>{
    const {name,email,password}=req.body
   const result=await registerUser(name,email,password)
   res.status(201).json(result)
})

// @route   POST /login
// @desc    Login user and return a JWT
exports.login=asycHandler(async(req,res)=>{
    const {email,password}=req.body
        // one response can be sent for a single request because of the HTTP protocol's request-response cycle. 
        const result=await loginUser(email,password)
        res.status(200).json(result)
    // res.send("worked")
})

