import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import DetailSec from '../Components/Detail/DetailSec'
import DetailBack from '../Components/DetailSec/DetailBack'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'
import Review from '../Components/Review/Review'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function DetailPage() {
  const {id}=useParams()
  const productId=Number(id)
  const userId=useSelector((state)=>state.auth.user?.id)
  return (
    <div>
        <Navbar/>
        <DetailBack/>
        {/* <Commom title={"Detail"}/> */}
        <DetailSec/>
        <Review productId={productId} userId={userId}/>
         <Footer/>
        
    </div>
  )
}

export default DetailPage