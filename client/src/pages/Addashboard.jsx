import React from 'react'
import { Navbar, Footer } from "../components";
import AdSidebar from '../components/AdSidebar';

function Addashboard() {
  return (
    <div>
        <Navbar />
            <div className="">
                <AdSidebar/>
            </div>
        <Footer />
    </div>
  )
}

export default Addashboard