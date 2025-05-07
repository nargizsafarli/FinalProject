import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import NavSlider from '../Components/NavSlider/NavSlider'
import HomeCollection from '../Components/HomeCollection/HomeCollection'
import Testimonile from '../Components/Testimoniel/Testimonile'
import HomeTime from '../Components/HomeTime/HomeTime'
import Footer from '../Shared/Footer/Footer'

function HomePage() {
  return (
    <div>
        <Navbar/>
        <NavSlider/>
        {/* <HomeTime/> */}
        <HomeCollection/>
        <Testimonile/>
        <Footer/>
    </div>
  )
}

export default HomePage