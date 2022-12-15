import React from 'react'
import { useEffect, useState } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useSelector} from 'react-redux'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

function Payment() {
    const {isuserSuccess}=useSelector(state=>state.user)
    const location=useLocation()
    //console.log(location)

    const Paypal=()=>{
        const navigate=useNavigate()
        const {products,quantity,total}=useSelector(state=>state.cart)
        const currentUser = useSelector((state) => state.user.userObj);
        const shipping_address=location.state.addressObj
        //console.log(shipping_address)
        return(
            <PayPalScriptProvider options={{ "client-id": "ARPjg3VHnk3ZAmjY-UlNPxzN563d8cUX4LxcJC1ETObdXaVMnAjKmFbcQ7Vqwo5AQgmGF8N6iGV3tMhS" }}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: "USD",
                                            value: Math.round(total+shipping_address.shipping_cost)
                                        }
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                //console.log(details)
                                //alert(`Transaction completed by ${name}`);
                                axios.post("/order", {
                                    userId: currentUser._id,
                                    products: products.map((item) => ({
                                    productId: item._id,
                                    quantity: item._quantity,
                                    })),
                                    amount: details.purchase_units[0].amount.value,
                                    paymentId: details.id,
                                    paymentStatus: details.status,
                                    payerDetails:{
                                        name: details.purchase_units[0].shipping.name,
                                        email: details.payer.email_address,
                                        address: details.purchase_units[0].shipping.address
                                    }
                                })
                                .then(res=>{
                                    //console.log(res)
                                    let arr=res.data.order
                                    navigate('/payment/success',{state:{arr}})
                                })
                                .catch(error=>console.log(error))
                            });
                        }}
                    />
            </PayPalScriptProvider>
        )
    }
    

    const EmptyCart = () => {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 bg-light text-center">
                <h4 className="p-3 display-5">Your Cart is Empty</h4>
                <Link to="/" className="btn  btn-outline-dark mx-4">
                  <i className="fa fa-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        );
    };

    const Login = () => {
    return (
        <div className="container">
        <div className="row">
            <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Please login to checkout</h4>
            <Link to="/login" className="btn  btn-outline-dark mx-4">
                <i className="fa fa-arrow-left"></i> Login
            </Link>
            </div>
        </div>
        </div>
    );
    };

  return (
    <>
        <Navbar />
        <div className="m-5 p-5 container">
            {
                isuserSuccess===false 
                ? <Login />
                : 
                (location.state===null 
                ? <EmptyCart />
                :
                <Paypal />)
            }
        </div>
        <Footer />
    </>
  )
}

export default Payment