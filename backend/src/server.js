import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authroutes);
app.use("/api/messages", messageroutes);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on Port : ${PORT}`);
});