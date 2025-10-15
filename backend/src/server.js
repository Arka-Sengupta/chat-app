import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json())//req.body 

app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);

// make ready for deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    });
}

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on Port : ${PORT}`);
    connectDB();
});