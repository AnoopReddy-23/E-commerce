const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const ProductModel = mongoose.model("ProductModel");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");


//import cloudinary, multer, multer-storage-cloudinary
var cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')


//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})


//configure cloudinary storage
const cloudinaryStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params: async (req,file)=>{
        return{
            folder:"E-BIZZ",
            public_id:file.fieldname + "-" + Date.now(),
        }
    }
})

//configure multer
var upload=multer({storage:cloudinaryStorage})


//GET ALL PRODUCTS
router.get("/get-products", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await ProductModel.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await ProductModel.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
});


//GET PRODUCT
router.get("/get-product/:id", async (req, res) => {
    try {
      const product = await ProductModel.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
});


router.post('/add-product',upload.single("image"),verifyTokenAndAdmin,(req,res)=>{
    const { title, description, image, category, price, stock, rate, count } = JSON.parse(req.body.prodObj);
    //console.log( username, password, email, city, profileImg)
    ProductModel.findOne({ title: title })
        .then((dbProduct) => {
            if (dbProduct) {
                return res.json({ message: "Product with title already exist." });
            }
            const product = new ProductModel({ title, description, image:req.file.path, category, price, stock, rating:{rate,count }});
            product.save()
                .then((u) => {
                    //console.log(u)
                    res.json({ message: "Product added successfully", product: product});
                })
                .catch((error) => {
                    return res.json({message:error})
                });

        })
        .catch((error) => {
            console.log(error);
        });
})

module.exports=router;