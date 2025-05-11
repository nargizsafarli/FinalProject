import React from 'react'
import servise from "./ServiceHome.module.css"
import svg1 from "./assets/plant.svg"
import svg2 from "./assets/download.svg"
import svg3 from "./assets/download (3).svg"
import svg4 from "./assets/download (2).svg"
function ServiceHome() {
  return (
    <div className={servise.container} >
    <div className={servise.weDo}>
        <p>What We Do</p>
        <h2>OUR SERVISES</h2>
    </div>
    <div className={servise.inf}>
        <div className={servise.item}>
          <div className={servise.imgWrapper}> <img src={svg1} className={servise.icon}/></div>
            <div className={servise.text}>
                <h3>PICK YOUR PLANT</h3>
                <p>There are variations of passages the lorem Ipsum</p>
            </div>
        </div>
         <div className={servise.item}>
           <div className={servise.imgWrapper}><img src={svg2} className={servise.icon}/></div> 
            <div className={servise.text}>
                <h3>PICK YOUR PLANT</h3>
                <p>There are variations of passages the lorem Ipsum</p>
            </div>
        </div>
         <div className={servise.item}>
          <div className={servise.imgWrapper}><img src={svg3} className={servise.icon}/></div>  
            <div className={servise.text}>
                <h3>PICK YOUR PLANT</h3>
                <p>There are variations of passages the lorem Ipsum</p>
            </div>
        </div>
         <div className={servise.item}>
           <div className={servise.imgWrapper}><img src={svg4} className={servise.icon}/></div> 
            <div className={servise.text}>
                <h3>PICK YOUR PLANT</h3>
                <p>There are variations of passages the lorem Ipsum</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ServiceHome