import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import ProductSec from '../Components/ProductSection/ProductSec'
import Product from '../Components/Product/Product'
import Commom from '../Shared/components/Commom/Commom'

function ShopPage() {
  return (
    <div>
        <Navbar/>
       {/* <div style={{paddingTop:"80px"}}> */}
       <Commom title={"Products"} subtitle={"shop"}/>
        <Product/>
       {/* </div>  */}
    </div>
  )
}

export default ShopPage