import jwt from "jsonwebtoken"
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,//7days in terms of mS
        httpOnly: true,//prevents XSS attacks: cross-site scripting
        sameSite:"strict",//prevents CSRF attacks
        secure:process.env.NODE_ENV==="production"?true:false,//during production we would have http's' otherwise in development we would have http
    })
    return token;
};