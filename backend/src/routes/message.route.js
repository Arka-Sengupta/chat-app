import express from "express";
const router = express.Router();
router.get("/send",(req,res)=>{
    res.send("Send Message Route");
});
router.get("/recieve",(req,res)=>{
    res.send("recieve Message Route");
});
export default router;