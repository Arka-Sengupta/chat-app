import bcrypt from "bcryptjs/dist/bcrypt.js";
import User from "../models/user.js";
import { generateToken } from "../lib/utils.js";
export const signup =  async(req, res) => {
    const {fullName,email,password}=req.body;
    try {
        if(!fullName||!email||!password){
            return res.status(400).json({message:"All fields are required"})//status code 400 means bad request
        }
        if(password<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"})
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"})
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already registered"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        if(newUser){
            ///persisting the user first then generating the auth cookie
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser._fullName,
                email:newUser._email,
                profilePic:newUser._profilePic,
            })
        }else{
            res.status(400).json({message:"Invalid User data"});
        }
    } catch (error) {
        console.log("Error in SignUp controller: ",error)
        res.status(500).json({message:"Internal Server Error"});
    }
}