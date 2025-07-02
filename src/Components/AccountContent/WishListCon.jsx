import React from 'react'
import Wishlist from '../Wishlist/Wishlist'
import comment from "./Comment.module.css"

function WishListCon() {
  return (
    <div className={comment.wishCon}>
         <h2 className={comment.titleWish}>My Wishlist</h2>
        <Wishlist/>
    </div>
  )
}

export default WishListCon