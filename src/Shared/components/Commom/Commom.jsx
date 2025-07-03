import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import commom from "./Commom.module.css";
import React from "react";
import i18n from "../../../i18n/i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Commom({ title, subtitle }) {
  const currentLang=i18n.language
  const navigate=useNavigate()
  const {t}=useTranslation()
  return (
    <div>
      <div className={commom.container}>
        <h1 className={commom.tit}>{title}</h1>
        <p>
          <span onClick={()=>navigate(`/${currentLang}`)} className={commom.homeLink}>
            {t("pro.home")} <FontAwesomeIcon icon={faAngleRight} className={commom.icon} />
          </span>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default Commom;
