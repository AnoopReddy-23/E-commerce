const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    title: { 
        type: String, 
    },
    description: { 
        type: String, 
    },
    image: { 
        type: String, 
        default: "https://res.cloudinary.com/anoop23/image/upload/v1665381608/SociaMediaApp/ProfilePics/human-profile-picture-black-vector-260nw-239192701_rchnar.jpg"
    },
    category: { 
        type: String 
    },
    price: { 
        type: Number 
    },
    stock: { 
        type: Number, 
    },
    rating: {
        count: {
            type: Number,
        },
        rate: {
            type: Number,
        }
    }
},
  { timestamps: true }
)

mongoose.model("ProductModel",productSchema)