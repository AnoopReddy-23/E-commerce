const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const OrderModel = mongoose.model("OrderModel");


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

router.post('/order',(req,res)=>{
    //console.log(req.body)
    const data = req.body;
    const order = new OrderModel(data);
    order.save()
        .then((u) => {
            //console.log(u)
            res.json({ message: "Order placed successfully", order: order._id});
        })
        .catch((error) => {
            return res.json({message:error})
        });
})

//GET ALL USER
router.get("/get-orders", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const orders = query
        ? await OrderModel.find().sort({ _id: -1 }).limit(5)
        : await OrderModel.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports=router;