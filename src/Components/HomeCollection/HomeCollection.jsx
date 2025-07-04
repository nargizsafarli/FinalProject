import React from 'react';
import collec from "./HomeCollec.module.css";
import img1 from "./assets/banner-v4-1.webp"
import img2 from "./assets/banner-v4-2.webp"
import Button from '../../Shared/components/Button/Button';
import { useTranslation } from 'react-i18next';

function HomeCollection() {
  const {t}=useTranslation()
  return (
    <div className={collec.container}>
      <div className={collec.item}>
        <div className={collec.imgWrapper}>
          <img src={img1} alt="Plant Port" />
        </div>
        <div className={collec.content}>
          <p>{t("collec.titleO")}</p>
          <h2>{t("collec.infO")}</h2>
          {/* <button className={collec.button}>SHOP NOW</button> */}
          <Button/>
        </div>
      </div>

      <div className={collec.item}>
        <div className={collec.imgWrapper}>
          <img src={img2} alt="Ceramic Pot" />
        </div>
        <div className={collec.content}>
          <p>{t("collec.titleT")}</p>
          <h2>{t("collec.infT")}</h2>
          {/* <button className={collec.button}>SHOP NOW</button> */}
          <Button/>
        </div>
      </div>
    </div>
  );
}

export default HomeCollection;
