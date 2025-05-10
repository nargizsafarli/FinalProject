import React from 'react';
import collec from "./HomeCollec.module.css";
import img1 from "./assets/banner-v4-1.webp"
import img2 from "./assets/banner-v4-2.webp"
import Button from '../../Shared/components/Button/Button';

function HomeCollection() {
  return (
    <div className={collec.container}>
      <div className={collec.item}>
        <div className={collec.imgWrapper}>
          <img src={img1} alt="Plant Port" />
        </div>
        <div className={collec.content}>
          <p>New Collection</p>
          <h2>Plant Port</h2>
          {/* <button className={collec.button}>SHOP NOW</button> */}
          <Button/>
        </div>
      </div>

      <div className={collec.item}>
        <div className={collec.imgWrapper}>
          <img src={img2} alt="Ceramic Pot" />
        </div>
        <div className={collec.content}>
          <p>Only On Our Store!</p>
          <h2>Ceramic Pot & Plant</h2>
          {/* <button className={collec.button}>SHOP NOW</button> */}
          <Button/>
        </div>
      </div>
    </div>
  );
}

export default HomeCollection;
