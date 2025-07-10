import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Register from '../Components/Register/Register'
import Footer from '../Shared/Footer/Footer'
import { useTranslation } from 'react-i18next'
import Commom from '../Shared/components/Commom/Commom'

function RegisterPage() {
  const {t}=useTranslation()
  return (
    <div>
        <Navbar/>
        <Commom title={t("el.acc")} subtitle={t("el.reg")}/>
        <Register/>
        <Footer/>
    </div>
  )
}

export default RegisterPage