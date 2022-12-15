const express=require('express')
const app=express()
const mongoose=require('mongoose')
const PORT=4000;

const {DATABASE_CONNECTION}=require('./config')

mongoose.connect(DATABASE_CONNECTION);

mongoose.connection.on('connected',()=>{
    console.log('DB connected')
})

mongoose.connection.on('error',(error)=>{
    console.log('error', error)
})


require('./models/user_model')
require('./models/product_model')
require('./models/order_model')

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(require('./routes/auth'))
app.use(require('./routes/productRoute'))
app.use(require('./routes/orderRoute'))

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})