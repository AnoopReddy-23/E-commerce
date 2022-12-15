const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const ProductModel = mongoose.model("ProductModel");

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

router.post('/add-product',(req,res)=>{
    //console.log(req.body)
    const { title, desc, img, categories, size, color, price, inStock } = req.body;
    //console.log( username, password, email, city, profileImg)
    ProductModel.findOne({ title: title })
        .then((dbProduct) => {
            if (dbProduct) {
                return res.json({ message: "Product with title already exist." });
            }

            const product = new ProductModel({ title, desc, img, categories, size, color, price, inStock });
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