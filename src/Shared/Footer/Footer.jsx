import React from "react";
import foot from "./Footer.module.css";
import fLogo from "./assets/logo (1).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faPinterestP,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import paymentImg from "./assets/payment-logo.png";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <div className={foot.container}>
      <div className={foot.sec1}>
        <div className={foot.item}>
          <h4 className={foot.header}>{t("footer.contact")}</h4>
          <div className={foot.contactItem}>
            <p>{t("footer.area")}</p>
            <span>{t("footer.email")}</span>
            <span>{t("footer.call")}</span>
          </div>
        </div>
        <div className={foot.item}>
          <img src={fLogo} className={foot.logo} />
          <p>{t("footer.welcome")}</p>
          <div className={foot.icons}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={foot.iconsItem}
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={foot.iconsItem}
            >
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className={foot.iconsItem}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className={foot.iconsItem}
            >
              <FontAwesomeIcon icon={faPinterestP} />
            </a>
          </div>
        </div>
        <div className={foot.item}>
          <h4 className={foot.header}>{t("footer.seller")}</h4>
          <p>{t("footer.sub")}</p>
          <img src={paymentImg} className={foot.img}/>
        </div>
      </div>
      {/* <div className={foot.sec2}>
       <ul className={foot.nav}>
        <li>{t("footer.li1")}</li>
        <li>{t("footer.li2")}</li>
        <li>{t("footer.li3")}</li>
        <li>{t("footer.li4")}</li>
        <li>{t("footer.li5")}</li>
       </ul>
      </div> */}
      <div className={foot.sec3}>
        <p>
          @{currentYear}
          {t("footer.ecom")}
        </p>
      </div>
    </div>
  );
}

export default Footer;
