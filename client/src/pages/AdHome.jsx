import React from 'react'
import {userData} from '../dummydata'
import AdChart from '../components/AdChart'
import '../styles/AdHome.css'
import AdSidebar from '../components/AdSidebar'
import AdInfo from '../components/AdInfo'
import AdWidgetUsers from '../components/AdWidgetUsers'
import AdWidgetTrans from '../components/AdWidgetTrans'
import { Navbar, Footer } from "../components";


function AdHome() {
  return (
    <>
        <Navbar />
        <div className="row">
            <div className="col-3">
                <AdSidebar />
            </div>
            <div className="col-9 mt-3">
                <AdInfo />
                <div className='home'>
                    <AdChart data={userData} title="User Analytics" grid dataKey="Active User"/>
                </div>
                <div className="homeWidgets">
                    <AdWidgetUsers />
                    <AdWidgetTrans />
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default AdHome