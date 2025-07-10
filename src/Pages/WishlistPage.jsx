import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Wishlist from '../Components/Wishlist/Wishlist'
import Commom from '../Shared/components/Commom/Commom'
import Footer from '../Shared/Footer/Footer'
import { useTranslation } from 'react-i18next'

function WishlistPage() {
  const {t}=useTranslation()
  return (
    <div>
        <Navbar/>
        <Commom title={t("el.wish")} subtitle={t("el.wish")}/>
        <Wishlist/>
        <Footer/>
    </div>
  )
}

export default WishlistPage