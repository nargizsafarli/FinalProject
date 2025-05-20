import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import ProductSec from '../Components/ProductSection/ProductSec'

function ShopPage() {
  return (
    <div>
        <Navbar/>
       {/* <div style={{paddingTop:"80px"}}> */}
        <ProductSec/>
       {/* </div>  */}
    </div>
  )
}

export default ShopPage