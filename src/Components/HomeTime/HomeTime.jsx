import React from 'react'
import timer from "./HomeTime.module.css"
import img from "./assets/banner-v9-1.webp"
function HomeTime() {
  return (
    <div className={timer.container}>
        <div className={timer.img}>
            <img src={img}/>
        </div>
        <div className={timer.information}>
            <p>HANDPICK COLLECTION</p>
            <h3>Spring Collection 2019</h3>
        </div>
    </div>
  )
}

export default HomeTime