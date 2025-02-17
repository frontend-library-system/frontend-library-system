import React from 'react'
import { Header } from '../layout/Header'
import Sidebar from '../../pages/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <div>
      <Header />
      <div>
        <Sidebar/>
        <div className='div-dashboard'>
          {/* Render child components dynamically */}
          <Outlet/>
        </div>
      </div>
    </div>
    </>

)
}

export default Dashboard