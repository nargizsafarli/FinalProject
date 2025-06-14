import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Commom from '../Shared/components/Commom/Commom'
import Footer from '../Shared/Footer/Footer'
import Faq from '../Components/Faq/Faq'

function FaqPage() {
  return (
    <div>
        <Navbar/>
        <Commom title={"FAQ"} subtitle={"Faq"}/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default FaqPage