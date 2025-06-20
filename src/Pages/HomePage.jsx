import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import NavSlider from '../Components/NavSlider/NavSlider'
import HomeCollection from '../Components/HomeCollection/HomeCollection'
import Testimonile from '../Components/Testimoniel/Testimonile'
import HomeTime from '../Components/HomeTime/HomeTime'
import Footer from '../Shared/Footer/Footer'
import Logo from '../Components/Logo/Logo'
import ServiceHome from '../Components/ServiceHome/ServiceHome'
import HomeProduct from '../Components/HomeProduct/HomeProduct'

function HomePage() {
  return (
    <div>
        <Navbar/>
        <NavSlider/>
        <ServiceHome/>
        {/* <HomeTime/> */}
        <HomeCollection/>
        {/* <HomeProduct/> */}
        <Testimonile/>
        <Logo/>
        <Footer/>
    </div>
  )
}

export default HomePage