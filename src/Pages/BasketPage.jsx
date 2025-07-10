import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Basket from '../Components/Basket/Basket'
import Commom from '../Shared/components/Commom/Commom'
import { useTranslation } from 'react-i18next'


function BasketPage() {
  const {t}=useTranslation()
  return (
    <div>
        <Navbar/>
        <Commom title={t("el.bask")} subtitle={t("el.bask")}/>
        <Basket/>
    </div>
  )
}

export default BasketPage