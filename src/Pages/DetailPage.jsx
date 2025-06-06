import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import DetailSec from '../Components/Detail/DetailSec'
import DetailBack from '../Components/DetailSec/DetailBack'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'

function DetailPage() {
  return (
    <div>
        <Navbar/>
        <DetailBack/>
        {/* <Commom title={"Detail"}/> */}
        <DetailSec/>
         <Footer/>
        
    </div>
  )
}

export default DetailPage