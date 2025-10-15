import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    fullName:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true,
        minlenght:6
    },
    profilePic:{
        type:String,
        default:""
    },
},
{timestamps:true}//createdAt and updatedAt
);
const User = mongoose.model("User",userSchema)//makes an user model based of the provided schema

export default User;