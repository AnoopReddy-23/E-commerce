import React from 'react'
import "../styles/AdSidebar.css";

import {
  MdOutlineLineStyle,
  MdOutlineTimeline,
  MdOutlinePermIdentity,
  MdOutlineStorefront,
  MdOutlineAttachMoney,
 
} from "react-icons/md";
import {  FcAddImage,} from 'react-icons/fc'

import { Link } from "react-router-dom";

function AdSidebar() {
  return (
    <div className="sidebar">
    <div className="sidebarWrapper">
      <div className="sidebarMenu">
        <h3 className="sidebarTitle">Dashboard</h3>
        <ul className="sidebarList">
          <Link to="/admin/" className="link">
          <li className="sidebarListItem active">
            <MdOutlineLineStyle className="sidebarIcon" />
            Home
          </li>
          </Link>
          <Link to='/admin/analytics' className='link'>
          <li className="sidebarListItem">
            <MdOutlineTimeline className="sidebarIcon" />
            Analytics
          </li>
          </Link>
        </ul>
      </div>
      <div className="sidebarMenu">
        <h3 className="sidebarTitle">Quick Menu</h3>
        <ul className="sidebarList">
          <Link to="/admin/users" className="link">
            <li className="sidebarListItem">
              <MdOutlinePermIdentity className="sidebarIcon" />
              Users
            </li>
          </Link>
          <Link to="/admin/products" className="link">
            <li className="sidebarListItem">
              <MdOutlineStorefront className="sidebarIcon" />
              Products
            </li>
          </Link>
         <Link to="/admin/orders" className="link">
            <li className="sidebarListItem">
              <MdOutlineAttachMoney className="sidebarIcon" />
              Transactions
            </li>
         </Link>
         <Link to="/admin/add-product" className="link">
            <li className="sidebarListItem">
              <FcAddImage className="sidebarIcon" />
              Add Product
            </li>
         </Link>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default AdSidebar