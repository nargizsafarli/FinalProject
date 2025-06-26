import React from 'react'
import thank from "./Thanks.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import { MdOutlineLocalShipping } from "react-icons/md";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { FaBox } from "react-icons/fa";
import { TbReceiptRefund } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import i18n from '../../i18n/i18next';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Thanks() {
    const trackId = Math.floor(100000 + Math.random() * 900000);

const now = new Date();
const formatDate = (date) =>
  `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth()+1)
    .toString().padStart(2,"0")}.${date.getFullYear()}`;
const {t}=useTranslation()
const dates = [
  formatDate(now),
  formatDate(new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)), // +3 gün
  formatDate(new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000)), // +6 gün
  formatDate(new Date(now.getTime() + 9 * 24 * 60 * 60 * 1000)), // +9 gün
];
const currentLang=i18n.language
const navigate=useNavigate()
  return (
    <div className={thank.mainCon}>
    <div className={thank.container}>
      <div className={thank.left}>
        <div className={thank.ready}><FontAwesomeIcon icon={faCheck} /></div>
        <p className={thank.orderThank}>{t("thank.leftP")}</p>
        <span className={thank.orderInf}>{t("thank.leftSp")}</span>
        <div className={thank.orderNum}>
            <p>{t("thank.trackId")}</p>
            <span>#{trackId}</span>
        </div>
        <div className={thank.track}>
           <div className={thank.trackItem}>
             <div className={thank.trackItemIcon}><GiConfirmed /></div>
           <p className={`${thank.orderC} ${thank.active}`}>{t("thank.orderRec")}</p>
           
            <div className={thank.date}>
              {dates[0]}
            </div>
           </div>
           <div className={thank.trackItem}>
            <div className={thank.trackItemIcon}><MdOutlineLocalShipping /></div>
            <p className={thank.orderC}>{t("thank.orderShip")}</p>
           
            <div className={thank.date}>
              {dates[1]}
            </div>
           </div>
             <div className={thank.trackItem}>
            <div className={thank.trackItemIcon}><IoFileTrayFullOutline /></div>
             <p className={thank.orderC}>{t("thank.outofdel")}</p>
            <div className={thank.date}>
             {dates[2]}
            </div>
           </div>
             <div className={thank.trackItem}>
              <div className={thank.trackItemIcon}><IoHome /></div>
            <p className={thank.orderC}>{t("thank.orderdel")}</p>
            <div className={thank.date}>
             {dates[3]}
            </div>
           </div>
        </div>
        <button className={thank.btn} onClick={()=>navigate(`/${currentLang}/shop`)} >{t("thank.btn")}</button>
      </div>
      <div className={thank.right}>
        <p className={thank.rightTxt}>{t("thank.shouhd")}
         <hr className={thank.hr}/>
        </p>
       
        <div className={thank.rightTop}>
        <div className={thank.rightItem}>
           <FaBox />
           <p className={thank.rightToptext}>{t("thank.free")}</p>
           </div>
            <div className={thank.rightItem}>
          <TbReceiptRefund />
           <p className={thank.rightToptext}>{t("thank.goback")}</p>
           </div>
        </div>
         <div className={thank.rightBottom}>
        <div className={thank.rightItem}>
           <MdSecurity />
           <p className={thank.rightToptext}>{t("thank.zem")}</p>
           </div>
            <div className={thank.rightItem}>
          <FaRegAddressCard />
           <p className={thank.rightToptext}>{t("thank.safe")}</p>
           </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Thanks