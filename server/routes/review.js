const router=require("express").Router();
// require the middlewares
const verifyToken=require("../middlewares/verify-token");
const upload=require("../middlewares/upload-photo");
//require the models
const Review=require("../models/review");
const Product=require("../models/product");


//Post request for adding review
router.post("/reviews/:productID",[verifyToken,upload.single("photo")],async(req,res)=>{
    try{
        const review=new Review();
        review.headline=req.body.headline;
        review.body=req.body.body;
        review.rating=req.body.rating;
        review.photo=req.file.location;
        review.productID=req.params.productID;
        review.user=req.decoded._id;

        await Product.update({$push:review._id})

        const response=await review.save();

        if(response){
            res.json({
                success:true,
                message:"Review added successfully!"
            })
        }

    }catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

// Get Reviews of specific product
router.get("/review/:productID",async (req,res)=>{
    try{
        const productReviews=await Review.find({productID:req.params.productID}).populate("user").exec();
        res.json({
            success:true,
            reviews:productReviews
        })
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
    
});

module.exports=router;