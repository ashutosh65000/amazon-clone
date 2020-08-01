const jwt=require("jsonwebtoken");
module.exports=function (req,res,next){
    let token=req.headers["x-access-token"] || req.headers["authorization"];
    // some time the browser appends the Bearer with the token so we need to remove it before verifying the token itself.
    let checkBearer="Bearer ";
    // console.log(req);
    if(token){
        if(token.startsWith(checkBearer)){
            token=token.slice(checkBearer.length,token.length)
        }
        jwt.verify(token,process.env.SECRET,(err,decoded)=>{
            if(err){
                res.json({
                    success:false,
                    message:"Authentication failed."
                })
            } else{
                req.decoded=decoded;
                next();
            }
        })
    }else{
        res.json({
            success:false,
            message:"No token was provided."
        })
    }
};