import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Account from '../Components/Account/Account'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'

function AccountPage() {
  return (
    <div>
        <Navbar/>
         <Commom title={"Account"} subtitle={"account"}/>
        <Account/>
        <Footer/>
    </div>
  )
}

export default AccountPage