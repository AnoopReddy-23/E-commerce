import React,{useEffect} from 'react'
import "../styles/AdProductList.css";
import { Table,Button } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { productRows } from "../dummydata";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar, Footer } from "../components";
import AdSidebar from '../components/AdSidebar'
import axios from 'axios';
import { useSelector } from 'react-redux';

function AdTransactionList() {

    const [data, setData] = useState([]);
    const {userObj}=useSelector(state=>state.user)
    useEffect(()=>{
        axios.get('/get-orders',{
          headers: {
            token: "Bearer "+userObj.token
          }
        })
        .then(res=>{
          setData(res.data)
          //console.log(data)
        })
        .catch(err=>console.log(err))
  },[])


  return (
    <>
    <Navbar />
    <div className="row">
        <div className="col-3">
            <AdSidebar />
        </div>
        <div className="col-8 mt-3 mx-auto">
          <div className="userList m-3">
            <Table responsive="md">
              <thead>
                <tr>
                  <th>CustomerId</th>
                  <th>PaymentId</th>
                  <th>Payment Status</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item)=>{
                    return(
                      <tr key={item._id} className="">
                        <td>{item.userId}</td>
                        <td className="">{item.paymentId}</td>
                        <td className="">{item.paymentStatus}</td>
                        <td className="">{item.amount}</td>
                        <td className="">{item.status}</td>
                        <td className="">
                          <Button variant='secondary' className='userListEdit'>View</Button>
                        </td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </Table>
          </div>
        </div>
    </div>
    <Footer />
    </>
  )
}

export default AdTransactionList