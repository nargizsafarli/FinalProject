import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import DetailSec from '../Components/Detail/DetailSec'
import AboutSec from '../Components/AboutSec/AboutSec'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'
import AboutGrid from '../Components/AboutGrid/AboutGrid'
import OutTeam from '../Components/Ourteam/OutTeam'
import { useTranslation } from 'react-i18next'

function AboutPage() {
  const {t}=useTranslation()
  return (
    <div>
     <Commom title={t("el.about")} subtitle={t("el.ab")}/>
        <Navbar/>
        <AboutSec/>
        <OutTeam/>
        <AboutGrid/>
        <Footer/>
    </div>
  )
}

export default AboutPage