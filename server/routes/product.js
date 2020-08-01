const router=require("express").Router()
const Product=require("../models/product")

//require the middleware for photo upload
const upload=require("../middlewares/upload-photo")

//POST ~ Create a new product
router.post("/products",upload.single("photo"),async(req,res)=>{
    try{
        let product=new Product();
        product.owner=req.body.ownerID;
        product.category=req.body.categoryID;
        product.price=req.body.price;
        product.title=req.body.title;
        product.description=req.body.description;       
        product.photo=req.file.location;
        product.stockQuantity=req.body.stockQuantity;

        await product.save();
        res.json({
            status: true,
            message: "Successfully uploaded and saved!"
        });
    } catch (err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

//GET ~ Get a product

router.get("/product/:id", async(req,res)=>{
    try{
        let product=await Product.findOne({_id: req.params.id}).populate("owner category").exec();
        res.json({
            status: true,
            Product: product
        });
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

//GET ~ Get all the products

router.get("/products", async(req,res)=>{
    try{
        let products=await Product.find().populate("owner category").exec();
        res.json({
            status: true,
            Products: products
        });
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

//PUT ~ Update a single product

router.put("/product/:id",upload.single("photo"), async(req,res)=>{
    try{
        let product=await Product.findOneAndUpdate(
            {_id:req.params.id},
            {
                $set:{
                    title:req.body.title,
                    price:req.body.price,
                    category:req.body.categoryID,
                    photo:req.file.location,
                    description:req.body.description,
                    owner:req.body.ownerID
                }
            },
            {upsert:true}
        );

        res.json({
            status: true,
            updatedProduct: product
        });
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});


//DELETE ~ Delete a single product

router.delete("/product/:id", async(req,res)=>{
    try{
        let deletedProduct=await Product.findOneAndDelete({_id: req.params.id});
        if(deletedProduct){
            res.json({
                status: true,
                message: "Successfully deleted the product."
            });
        }
    } catch(err){
        res.status(500).json({
            status: false,
            message: err.message
        });
    }
});

module.exports=router;