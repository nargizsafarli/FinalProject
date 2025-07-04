import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import DetailSec from '../Components/Detail/DetailSec'
import AboutSec from '../Components/AboutSec/AboutSec'
import Footer from '../Shared/Footer/Footer'
import Commom from '../Shared/components/Commom/Commom'
import AboutGrid from '../Components/AboutGrid/AboutGrid'
import OutTeam from '../Components/Ourteam/OutTeam'

function AboutPage() {
  return (
    <div>
     <Commom title={"ABOUT US"} subtitle={"about"}/>
        <Navbar/>
        <AboutSec/>
        <OutTeam/>
        <AboutGrid/>
        <Footer/>
    </div>
  )
}

export default AboutPage