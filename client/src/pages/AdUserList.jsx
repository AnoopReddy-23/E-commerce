import React from 'react'
import "../styles/AdUserList.css";
import { Table,Button } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { userRows } from "../dummydata";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Navbar, Footer } from "../components";
import AdSidebar from '../components/AdSidebar'


function AdUserList() {
  const [data, setData] = useState(userRows);
  //console.log(data)

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
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((item)=>{
                    return(
                      <tr key={item.id} className="">
                        <td>{item.id}</td>
                        <td className="userListUser">
                          <img
                            src={item.avatar}
                            alt=""
                            className="userListImg"
                          />
                          <span className="">{item.username}</span>
                        </td>
                        <td className="">{item.email}</td>
                        <td className="">{item.status}</td>
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