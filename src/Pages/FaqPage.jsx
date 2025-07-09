import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Commom from '../Shared/components/Commom/Commom'
import Footer from '../Shared/Footer/Footer'
import Faq from '../Components/Faq/Faq'
import { useTranslation } from 'react-i18next'

function FaqPage() {
   const {t}=useTranslation()
  return (
    <div>
        <Navbar/>
        <Commom title={"Faq"} subtitle={"Faq"}/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default FaqPage