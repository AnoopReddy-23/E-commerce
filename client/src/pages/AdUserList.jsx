import React from 'react'
import "../styles/AdUserList.css";
import { Table,Button } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { userRows } from "../dummydata";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar, Footer } from "../components";
import AdSidebar from '../components/AdSidebar'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';


function AdUserList() {
  const [data, setData] = useState(userRows);
  const {userObj}=useSelector(state=>state.user)
  //console.log(data)
  useEffect(()=>{
        axios.get('/get-users',{
          headers: {
            token: "Bearer "+userObj.token
          }
        })
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
        <div className="col-8 mx-auto mt-3">
          <div className="userList m-3">
            <Table responsive="md">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item)=>{
                    return(
                      <tr key={item._id} className="">
                        <td>{item._id}</td>
                        <td className="userListUser">
                          <img
                            src={item.profileImg}
                            alt=""
                            className="userListImg"
                          />
                          <span className="">{item.username}</span>
                        </td>
                        <td className="">{item.email}</td>
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

export default AdUserList