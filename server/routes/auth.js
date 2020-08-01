const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const verifyToken=require("../middlewares/verify-token");

// SignUp Route
router.post('/auth/signup',async (req,res)=>{
    if(!req.body.email || !req.body.password){
        res.json({
            success:false,
            message: "Please enter the email or password."
        })
    } else{
        try{
            let newUser=new User();
            newUser.name=req.body.name;
            newUser.email=req.body.email;
            newUser.password=req.body.password;
            
            await newUser.save();
            //to get output in JSON format used toJSON()
            let token=jwt.sign(newUser.toJSON(),process.env.SECRET,{
                //expiresIn takes time in seconds
                expiresIn:259200 //3 days
            });

            res.json({
                success:true,
                token:token,
                message:"Successfully created a new User"
            })

        } catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            }); 
        }
    }
});

// Fetch user profile after verifying the token
router.get("/auth/user", verifyToken, async(req,res)=>{
    try{
        let foundUser=await User.findOne({_id:req.decoded._id});
        if(foundUser){
            res.json({
                success:true,
                user:foundUser
            });
        }
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        }); 
    }
});

// Update user profile
router.put("/auth/user", verifyToken, async (req,res)=>{
    try{
        let foundUser=await User.findOne({_id:req.decoded._id})
        if(foundUser){
            if(req.body.name) foundUser.name=req.body.name;
            if(req.body.email) foundUser.email=req.body.email;
            if(req.body.password) foundUser.password=req.body.password;

            await foundUser.save();
            
            res.json({
                success:true,
                message:"Successfully Updated"
            });
        }
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        }); 
    }
});


// Login route for user and mathching the credentials
router.post("/auth/login",async(req,res)=>{
    // try{
    //     let foundUser=await User.findOne({email:req.body.email});
    //     if(!foundUser){
    //         //email id not found
    //         res.status(403).json({
    //             success:false,
    //             message:"Authentication failed.Email ID doesn't exsists."
    //         });
    //     } else{
    //         if(foundUser.comparePassword(req.body.password)){
    //             //password matches, assign the token
    //             let token=jwt.sign(foundUser.toJSON(),process.env.SECRET,{
    //                 expiresIn:259200
    //             });
    //             res.json({
    //                 success:true,
    //                 token:token
    //             });
    //         } else{
    //             //password not matches
    //             res.status(403).json({
    //                 success:false,
    //                 message:"Authentication failed.Wrong Password!"
    //             });
    //         }
    //     }
    // } catch(err){
    //     //any other error occures
    //     res.status(500).json({
    //         success:false,
    //         message:err.message
    //     });
    // }
    try {
        let user1=await User.findOne({email:req.body.email});
        // console.log("&&&&&&&)())()()",user);
        if(user1){
            if(!(user1.comparePassword(req.body.password))){
                res.status(403).json({
                    success:false,
                    message:"wrong pass"
                })
            } else{
                console.log("fsads",user1)
                let token=jwt.sign(user1.toJSON(),process.env.SECRET,{
                    expiresIn:259200
                });
                res.json({
                    success:true,
                    token:token
                });
            }
        }
        else{
            res.status(403).json({
                success:false,
                message:"email id not found"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

module.exports=router;