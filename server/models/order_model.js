const mongoose=require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
          {
            productId: {
              type: String,
            },
            quantity: {
              type: Number,
              default: 1,
            },
          },
        ],
        amount: { type: Number, required: true },
        paymentId:{type: String, required:true},
        paymentStatus:{type: String},
        payerDetails: { type: Object, required: true },
        status: { type: String, default: "pending" },
      },
      { timestamps: true }
)

mongoose.model("OrderModel",orderSchema)