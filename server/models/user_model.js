const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    email:{
        type: String
    },
    profileImg:{
        type: String,
        default: "https://res.cloudinary.com/anoop23/image/upload/v1665381608/SociaMediaApp/ProfilePics/human-profile-picture-black-vector-260nw-239192701_rchnar.jpg"
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
)

//hash password
userSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

//comapre password
userSchema.methods.isPasswordMatched=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

mongoose.model("UserModel",userSchema)