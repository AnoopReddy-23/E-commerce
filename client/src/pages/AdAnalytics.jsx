import React from 'react'
import {userData} from '../dummydata'
import AdChart from '../components/AdChart'
import AdSidebar from '../components/AdSidebar'
import { Navbar, Footer } from "../components";

function AdAnalytics() {
  return (
    <>
        <Navbar />
        <div className="row">
            <div className="col-3">
                <AdSidebar />
            </div>
            <div className="col-9 mt-3">
                <AdChart data={userData} title="User Analytics" grid dataKey="Active User"/>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default AdAnalytics