import React from "react";
import logo from "./Logo.module.css";
import logo1 from "./assets/1.jpg"
import logo2 from "./assets/2.jpg"
import logo3 from "./assets/3.jpg"
import logo4 from "./assets/4 (1).jpg"
import logo5 from "./assets/5.jpg"

function Logo() {
  return (
      <div className={logo.wrapper}>
    <div className={logo.container}>
      <img src={logo1} className={logo.flowerLogo}/>
      <img src={logo2} className={logo.flowerLogo}/>
      <img src={logo3} className={logo.flowerLogo}/>
      <img src={logo4} className={logo.flowerLogo}/>
      <img src={logo5} className={logo.flowerLogo}/>
       <img src={logo1} className={logo.flowerLogo}/>
      <img src={logo2} className={logo.flowerLogo}/>
      <img src={logo3} className={logo.flowerLogo}/>
      <img src={logo4} className={logo.flowerLogo}/>
      <img src={logo5} className={logo.flowerLogo}/>
    </div>
    </div>
  );
}

export default Logo;
