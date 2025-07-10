import React, { useEffect, useTransition } from 'react'
import servise from "./ServiceHome.module.css"
import svg1 from "./assets/plant.svg"
import svg2 from "./assets/download.svg"
import svg3 from "./assets/download (3).svg"
import svg4 from "./assets/download (2).svg"
import { useTranslation } from 'react-i18next'
import 'aos/dist/aos.css';
import Aos from 'aos'
function ServiceHome() {
  const {t}=useTranslation()
  useEffect(() => {
    Aos.init({
      duration: 800, 
    });
  }, []);
    return (
    <div className={servise.container} >
    <div className={servise.weDo}>
        <p data-aos="fade-up">{t("service.serviceP")}</p>
        <h2 data-aos="fade-up">{t("service.serviceH")}</h2>
    </div>
    <div className={servise.inf} >
        <div className={servise.item} data-aos="fade-up">
          <div className={servise.imgWrapper}> <img src={svg1} className={servise.icon}/></div>
            <div className={servise.text}>
                <h3>{t("service.titleOne")}</h3>
                <p>{t("service.infOne")}</p>
            </div>
        </div>
         <div className={servise.item} data-aos="fade-up">
           <div className={servise.imgWrapper}><img src={svg2} className={servise.icon}/></div> 
            <div className={servise.text}>
                <h3>{t("service.titleTwice")}</h3>
                <p>{t("service.infTwice")}</p>
            </div>
        </div>
         <div className={servise.item} data-aos="fade-up">
          <div className={servise.imgWrapper}><img src={svg3} className={servise.icon}/></div>  
            <div className={servise.text}>
                <h3>{t("service.titleThird")}</h3>
                <p>{t("service.infThird")}</p>
            </div>
        </div>
         <div className={servise.item} data-aos="fade-up">
           <div className={servise.imgWrapper}><img src={svg4} className={servise.icon}/></div> 
            <div className={servise.text}>
                <h3>{t("service.titleFour")}</h3>
                <p>{t("service.infFour")}</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ServiceHome