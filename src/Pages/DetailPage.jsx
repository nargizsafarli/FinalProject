import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import DetailSec from '../Components/Detail/DetailSec'
import DetailBack from '../Components/DetailSec/DetailBack'
import Footer from '../Shared/Footer/Footer'

function DetailPage() {
  return (
    <div>
        <Navbar/>
        <DetailBack/>
        <DetailSec/>
         <Footer/>
        
    </div>
  )
}

export default DetailPage