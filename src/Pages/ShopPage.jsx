import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import ProductSec from '../Components/ProductSection/ProductSec'
import Product from '../Components/Product/Product'

function ShopPage() {
  return (
    <div>
        <Navbar/>
       {/* <div style={{paddingTop:"80px"}}> */}
        <ProductSec/>
        <Product/>
       {/* </div>  */}
    </div>
  )
}

export default ShopPage