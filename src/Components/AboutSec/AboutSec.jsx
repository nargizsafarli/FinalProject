import React, { useEffect } from "react";
import abSec from "./AboutSec.module.css";
import leftImg from "./assets/cms-01.png";
import img2 from "./assets/cms-02.jpg"
import { useTranslation } from "react-i18next";
import Aos from "aos";
import 'aos/dist/aos.css';

function AboutSec() {
  useEffect(() => {
      Aos.init({
        duration: 1000, 
      });
    }, []);
  const {t}=useTranslation()
  return (
    <div className={abSec.container}>
      <div className={abSec.left} >
        <div className={abSec.imgCon} data-aos="zoom-in">
          <img src={leftImg} className={abSec.img} />
        </div>
        <div className={abSec.leftText} data-aos="zoom-in">
          <div className={abSec.textItem}>
            <div className={abSec.item}>
              <h3>{t("about.us")}</h3>
              <p>{t("about.us")}</p>
            </div>
            <span className={abSec.spantext}>
             {t("about.text1")}
            </span>
          </div>
          <div className={abSec.btn}> {t("about.shop")}</div>
        </div>
      </div>
      <div className={abSec.right} >
        <div className={abSec.rightText} data-aos="zoom-in">
          <div className={abSec.rightTextItem}>
            <div className={abSec.item}>
              <h3>{t("about.meet2")}</h3>
              <p>{t("about.col")}</p>
            </div>
            <span className={abSec.spantextTwo}>
             {t("about.text2")}
            </span>
           
          </div>
            <div className={`${abSec.btn} ${abSec.BtnTwo}`}> {t("about.shop")}</div>
        </div>
        <div className={abSec.imgConTwo} data-aos="zoom-in">
            <img src={img2} className={abSec.ImgTwo}/>
        </div>
      </div>
    </div>
  );
}

export default AboutSec;
