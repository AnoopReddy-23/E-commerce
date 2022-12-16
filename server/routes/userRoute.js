const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");


const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");

//GET ALL USER
router.get("/get-users", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await UserModel.find().sort({ _id: -1 }).limit(5)
        : await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
});


module.exports=router;