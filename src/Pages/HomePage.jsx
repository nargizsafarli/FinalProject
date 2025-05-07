import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import NavSlider from '../Components/NavSlider/NavSlider'
import HomeCollection from '../Components/HomeCollection/HomeCollection'

function HomePage() {
  return (
    <div>
        <Navbar/>
        <NavSlider/>
        <HomeCollection/>
    </div>
  )
}

export default HomePage