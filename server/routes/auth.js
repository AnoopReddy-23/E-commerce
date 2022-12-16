const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userFound =await UserModel.findOne({ email: email })
    if(userFound && (await userFound.isPasswordMatched(password))){
        // create and send a token
        const jwtToken = jwt.sign({ _id: userFound._id,isAdmin: userFound.isAdmin, }, JWT_SECRET, {expiresIn:"3d"});
        const { _id, username, email, profileImg, isAdmin } = userFound;
        res.json({ message:"Login successful", userInfo: { _id, username, email, profileImg, isAdmin, token: jwtToken}});
    } 
    else {
        return res.json({ message: "Invalid credentials!" });
    }
});


router.post('/register',(req,res)=>{
    //console.log(req.body)
    const { username, password, email, profileImg } = req.body;
    //console.log( username, password, email, city, profileImg)
    UserModel.findOne({ email: email })
        .then((dbUser) => {
            if (dbUser) {
                return res.json({ message: "User with email already exist." });
            }

            const user = new UserModel({ username, password, email, profileImg});
            user.save()
                .then((u) => {
                    //console.log(u)
                    res.json({ message: "User Registered successfully", userInfo: user});
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