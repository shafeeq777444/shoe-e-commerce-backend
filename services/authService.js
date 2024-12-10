const User = require('../model/User')
const jwt=require('jsonwebtoken')
const {auth}=require('../config/config')
const CustomError =require('../utils/customError') //keep capital for class name
// Register a new user----------------------------------------------------------------------------------------------------------------
exports.registerUser = async (name, email, password,role='user') => {
    let user = await User.findOne({ email });
    if (user) {
        throw new CustomError("Email already exists");
    }
    // creates a new document instance of the User model based on the schema.(instance create dont want variable scoped)
    user = new User({ name, email, password,role });
    await user.save();
    return { status: "success" };
};
exports.loginUser=async(email,password)=>{
    let user = await User.findOne({email})
    if(!user){
        // json middle ware convert this js object to json
        throw new CustomError("invalid user",404);
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new CustomError("incorrect password",401);
    }
    // generate jwt Token---------------------------------------
    const token=jwt.sign({userid:user._id},auth.jwtSecret,/*{expiresIn:"1d"}*/)
    return {token}
}