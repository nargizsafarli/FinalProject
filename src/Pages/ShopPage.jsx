import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Product from '../Components/Product/Product'
import Commom from '../Shared/components/Commom/Commom'

import { useTranslation } from 'react-i18next'

function ShopPage() {
  const {t}=useTranslation()
  return (
    <div>
        <Navbar/>
       <Commom title={t("el.product")} subtitle={t("el.shop")}/>
        <Product/>
    </div>
  )
}

export default ShopPage