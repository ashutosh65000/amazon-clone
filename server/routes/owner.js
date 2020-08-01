const router=require("express").Router()
const Owner=require("../models/owner")
const upload=require("../middlewares/upload-photo")

//POST ~ Create a new owner

router.post("/owners", upload.single("photo"), async(req,res)=>{
    try{
        const owner=new Owner();
        owner.name=req.body.name,
        owner.about=req.body.about,
        owner.photo=req.file.location

        await owner.save();
        res.json({
            success:true,
            message:"Successfully created a new category."
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
});

// GET ~ Get all the owners

router.get("/owners", async(req,res)=>{
    try{
        let owner=await Owner.find();
        res.json({
            success:true,
            message:owner
        });
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
});

module.exports=router;