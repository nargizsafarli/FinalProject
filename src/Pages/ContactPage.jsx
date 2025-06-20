import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Contact from '../Components/Contact/Contact'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'

function ContactPage() {
  return (
    <div>
        <Navbar/>
          <Commom title={"CONTACT US"} subtitle={"contact"}/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default ContactPage