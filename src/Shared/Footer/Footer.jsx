import React from "react";
import foot from "./Footer.module.css";
import fLogo from "./assets/logo (1).png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faPinterestP, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import paymentImg from "./assets/payment-logo.png"

function Footer() {
const currentYear = new Date().getFullYear();
  return (
    <div className={foot.container}>
    <div className={foot.sec1}>
      <div className={foot.item}>
        <h4 className={foot.header}>Contact us</h4>
        <div className={foot.contactItem}>
          <p>Bloomis Demo Store 507-Union Trade Center France</p>
          <span>Email:demo@example.com</span>
          <span>Call: (+91) 9876-543-210</span>
        </div>
      </div>
      <div className={foot.item}>
      <img src={fLogo} className={foot.logo}/>
       <p>Welcome to our store, where we pride ourselves on providing exceptional products and unparalleled customer service.</p>
       <div className={foot.icons}>
        <div className={foot.iconsItem}><FontAwesomeIcon icon={faFacebookF} /></div>
        <div className={foot.iconsItem}><FontAwesomeIcon icon={faXTwitter} /></div>
        <div className={foot.iconsItem}><FontAwesomeIcon icon={faYoutube} /></div>
        <div className={foot.iconsItem}><FontAwesomeIcon icon={faPinterestP} /></div>
       </div>
      </div>
      <div className={foot.item}>
       <h4  className={foot.header}>Our Newsletter</h4>
       <p>Subscribe to our latest newsletter to get news about special discounts.</p>
       <img src={paymentImg}/>
      </div>
      </div>
      <div className={foot.sec2}>
       <ul className={foot.nav}>
        <li>About</li>
        <li>Contact</li>
        <li>Shop</li>
        <li>FA'Q</li>
        <li>Blog</li>
       </ul>
      </div>
      <div className={foot.sec3}>
        <p>@{currentYear}-Ecoomerce software by me</p>
      </div>
    </div>
  );
}

export default Footer;
