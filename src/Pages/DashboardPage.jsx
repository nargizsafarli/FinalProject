import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Dashboard from '../Components/Dashboard/Dashboard'
import DashNav from '../Components/DashNav/DashNav'

function DashboardPage() {
  return (
    <div>
        {/* <Navbar/> */}
        <DashNav/>
        <Dashboard/>
    </div>
  )
}

export default DashboardPage