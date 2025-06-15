import React from "react";
import abSec from "./AboutSec.module.css";
import leftImg from "./assets/cms-01.png";
import img2 from "./assets/cms-02.jpg"

function AboutSec() {
  return (
    <div className={abSec.container}>
      <div className={abSec.left}>
        <div className={abSec.imgCon}>
          <img src={leftImg} className={abSec.img} />
        </div>
        <div className={abSec.leftText}>
          <div className={abSec.textItem}>
            <div className={abSec.item}>
              <h3>About Us</h3>
              <p>OURS PLANT HOUSE</p>
            </div>
            <span className={abSec.spantext}>
              Anventore veritatis et quasi architecto beatae dicta sun
              explicabo. Nemo enim. dduis abs no matter what
            </span>
          </div>
          <div className={abSec.btn}>Shop Now</div>
        </div>
      </div>
      <div className={abSec.right}>
        <div className={abSec.rightText}>
          <div className={abSec.rightTextItem}>
            <div className={abSec.item}>
              <h3>gold to interest</h3>
              <p>new collection</p>
            </div>
            <span className={abSec.spantextTwo}>
              Anventore veritatis et quasi architecto beatae dicta sun
              explicabo. Nemo enim. dduis abs no matter what about thiss
            </span>
           
          </div>
            <div className={`${abSec.btn} ${abSec.BtnTwo}`}>Shop Now</div>
        </div>
        <div className={abSec.imgConTwo}>
            <img src={img2} className={abSec.ImgTwo}/>
        </div>
      </div>
    </div>
  );
}

export default AboutSec;
