//import createSlice
import {createSlice} from '@reduxjs/toolkit'

//slice
let cartSlice=createSlice({
    name:'cart',
    initialState:{
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers:{
        clearCartStatus:(state)=>{
            state.products=[];
            state.quantity=0;
            state.total=0;
        },
        addProduct:(state,action)=>{
            const product = action.payload.product
            //console.log(product)
            const exist = state.products.find((x) => x.id === product.id)
            if(exist){
                // Increase the quantity
                let arr=state.products.map((x)=>x.id ===product.id?{...x, qty: x.qty+1}:x)
                state.products=arr
                state.total+=product.price
            }
            else{
                let prod={...product, qty:1}
                state.products.push(prod)
                state.quantity+=1
                state.total+=product.price
            }
        },
        removeProduct:(state,action)=>{
            const product = action.payload.product
            //console.log(product)
            const exist = state.products.find((x) => x.id === product.id)
            if(exist.qty === 1){
                let arr=state.products.filter((x)=>x.id!==exist.id)
                state.products=arr
                state.quantity-=1
                state.total-=product.price
            }
            else{
                let arr=state.products.map((x)=> x.id===product.id?{...x, qty:x.qty-1}:x)
                state.products=arr
                state.total-=product.price
            }
        }
    },
    
})

//export action creator
export const {addProduct,clearCartStatus,removeProduct}=cartSlice.actions
export default cartSlice.reducer