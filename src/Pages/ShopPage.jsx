import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import ProductSec from '../Components/ProductSection/ProductSec'
import Product from '../Components/Product/Product'
import Commom from '../Shared/components/Commom/Commom'
import Logo from '../Components/Logo/Logo'
import Footer from '../Shared/Footer/Footer'

function ShopPage() {
  return (
    <div>
        <Navbar/>
       <Commom title={"Products"} subtitle={"shop"}/>
        <Product/>
    </div>
  )
}

export default ShopPage