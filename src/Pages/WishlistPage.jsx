import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Wishlist from '../Components/Wishlist/Wishlist'
import Commom from '../Shared/components/Commom/Commom'
import Footer from '../Shared/Footer/Footer'

function WishlistPage() {
  return (
    <div>
        <Navbar/>
        <Commom title={"Wishlist"} subtitle={"My wishlist"}/>
        <Wishlist/>
        <Footer/>
    </div>
  )
}

export default WishlistPage