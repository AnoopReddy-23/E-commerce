import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import { clearCartStatus } from '../redux/reducer/cartslice';

function PaymentSuccess() {
    const navigate=useNavigate()
    const location = useLocation();
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cart)
    const {isuserSuccess}=useSelector(state=>state.user)
    const [orderId,setOrderId]=useState(null)

    useEffect(()=>{
        if(location.state!==null){
            setOrderId(location.state.arr)
        }
        else{
            navigate('/')
        }
    },[])

    useEffect(()=>{
        const cartEvent=()=>{
          dispatch(clearCartStatus(cart))
        }
        cartEvent()
      },[])

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        {
                orderId
                ? `Order has been created successfully. Your order number is ${orderId}`
                : `Successfull. Your order is being prepared...`
        
        }
      <Link to='/'><button style={{ padding: 10, marginTop: 20 }} >Go to Homepage</button></Link>
    </div>
  )
}

export default PaymentSuccess