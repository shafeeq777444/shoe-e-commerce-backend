const User = require('../model/User')
const jwt=require('jsonwebtoken')
const {auth}=require('../config/config')
// Register a new user----------------------------------------------------------------------------------------------------------------
exports.registerUser = async (name, email, password,role='user') => {
    let user = await User.findOne({ email });
    if (user) {
        throw new Error("Email already exists");
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
        throw new Error("invalid user");
    }
    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new Error("incorrect password");
    }
    // generate jwt Token---------------------------------------
    const token=jwt.sign({userid:user._id},auth.jwtSecret,/*{expiresIn:"1d"}*/)
    return {token}
}