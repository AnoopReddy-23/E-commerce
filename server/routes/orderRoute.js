const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const OrderModel = mongoose.model("OrderModel");

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
module.exports=router;