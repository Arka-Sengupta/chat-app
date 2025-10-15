import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("ERROR connecting to MongoDB: ",error);
        process.exit(1);//1 statuscode means failed, 0 means success
    }
}