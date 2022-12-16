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

function AdProductList() {

    const [data, setData] = useState(productRows);
    //console.log(data)
    useEffect(()=>{
      axios.get('/get-products')
      .then(res=>{
        setData(res.data)
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
                  <th>Id</th>
                  <th>Product</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item)=>{
                    return(
                      <tr key={item._id} className="">
                        <td>{item._id}</td>
                        <td className="productListItem">
                          <img
                            src={item.image}
                            alt=""
                            className="productListImg"
                          />
                          <span>{item.title}</span>
                        </td>
                        <td className="">{item.stock}</td>
                        <td className="">{item.category}</td>
                        <td className="">{item.price}</td>
                        <td className="">
                          <Button variant='secondary' className='userListEdit'>Edit</Button>
                          <Button variant='light' className='userListDelete'><MdDeleteOutline /></Button>
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

export default AdProductList