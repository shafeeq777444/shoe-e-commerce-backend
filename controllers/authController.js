
const {registerUser,loginUser}=require('../services/authService')
// @route   POST /register
// @desc    Register a new user
exports.register=async(req,res)=>{
    const {name,email,password}=req.body
    try{
   const result=await registerUser(name,email,password)
   res.status(201).json(result)
    }catch(err){
        console.error(err);
        res.status(400).json({message:err.message})
    }  
}

// @route   POST /login
// @desc    Login user and return a JWT
exports.login=async(req,res)=>{
    const {email,password}=req.body
try{
        // one response can be sent for a single request because of the HTTP protocol's request-response cycle. 
        const result=await loginUser(email,password)
        res.status(200).json(result)
    // res.send("worked")
}catch(err){
    res.status(400).json({message:err.message})
    }
}

