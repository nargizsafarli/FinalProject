import React from "react";
import detSec from "./DetailSec.module.css"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function DetailBack() {
  const {t}=useTranslation()
  return (
    <div className={detSec.container}>
      <p> <Link to={"/"} className={detSec.link}> {t("notif.hom")} </Link> | {t("notif.plant")} </p>
    </div>
  );
}

export default DetailBack;
