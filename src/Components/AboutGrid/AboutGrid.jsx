import React from 'react'
import grid from "./AboutGrid.module.css"
import banner1 from "./assets/banner-01.jpg"
import banner2 from "./assets/banner-02.jpg"
import banner3 from "./assets/banner-03.jpg"
import banner4 from "./assets/banner-04.jpg"
import { useTranslation } from 'react-i18next'


function AboutGrid() {
  const {t}=useTranslation()
  return (
    <div className={grid.container}>
        <div className={`${grid.left} ${grid.card}`}>
            <img src={banner1}/>
            <div className={grid.leftItem}>
                <p>{t("about.summ")}</p>
                <span>{t("about.off")}</span>
            </div>
        </div>
        <div className={grid.right}>
            <div className={grid.rightTop}>
              <div className={`${grid.rightLeft} ${grid.card}`}>
                <img src={banner2}/>
               <div className={grid.leftIte}>
                <p>{t("about.save")}</p>
                <span>{t("about.off")}</span>
               </div> 
              </div>
              <div className={`${grid.rightRight} ${grid.card}`}>
                 <img src={banner3}/>
                 <p className={grid.pot}>{t("about.off")}</p>
              </div>
            </div>
            <div className={`${grid.rightUnder} ${grid.card}`}>
                <img src={banner4}/>
                <div className={grid.righttextt}>
                    <p>{t("about.quan")}</p>
                    <span>{t("about.grow")}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutGrid