import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Contact from '../Components/Contact/Contact'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'
import { useTranslation } from 'react-i18next'

function ContactPage() {
   const {t}=useTranslation()
  return (
   
    <div>
        <Navbar/>
          <Commom title={t("el.contact")} subtitle={t("el.con")}/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default ContactPage