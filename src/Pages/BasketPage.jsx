import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Basket from '../Components/Basket/Basket'
import Commom from '../Shared/components/Commom/Commom'

function BasketPage() {
  return (
    <div>
        <Navbar/>
        <Commom title={"Basket"} subtitle={"basket"}/>
        <Basket/>
    </div>
  )
}

export default BasketPage