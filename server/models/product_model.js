const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
    },
    desc: { 
        type: String, 
    },
    img: { 
        type: String, 
        default: "https://res.cloudinary.com/anoop23/image/upload/v1665381608/SociaMediaApp/ProfilePics/human-profile-picture-black-vector-260nw-239192701_rchnar.jpg"
    },
    categories: { 
        type: Array 
    },
    size: { 
        type: Array 
    },
    color: { 
        type: Array 
    },
    price: { 
        type: Number 
    },
    inStock: { 
        type: Boolean, 
        default: true 
    },
},
  { timestamps: true }
)

mongoose.model("ProductModel",productSchema)