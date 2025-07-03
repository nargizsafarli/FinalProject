import React, { useState } from "react";
import acc from "./Account.module.css";
import AccountCon from "../AccountContent/AccountCon";
import WishListCon from "../AccountContent/WishListCon";
import CommentCon from "../AccountContent/CommentCon";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import i18n from "../../i18n/i18next";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function Account() {
  const [activeTab, setActiveTab] = useState("account");
  const {t}=useTranslation()
  const currentLang=i18n.language
  const navigate=useNavigate()
  const dispatch=useDispatch()
const logOut = () => {
    dispatch(logoutUser());
    navigate(`/${currentLang}/login`);
  };
  return (
    <div className={acc.container}>
      <div className={acc.left}>
        <ul className={acc.menu}>
          <li
            className={activeTab === "account" ? acc.active : ""}
            onClick={() => setActiveTab("account")}
          >
            {t("acc.account")}
          </li>
          <hr  className={acc.hr}/>
          <li
            className={activeTab === "wishlist" ? acc.active : ""}
            onClick={() => setActiveTab("wishlist")}
          >
             {t("acc.wish")}
          </li>
          <hr className={acc.hr}/>
          <li
            className={activeTab === "comments" ? acc.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            {t("acc.comm")}
          </li>
          <hr  className={acc.hr}/>
          <li  className={activeTab === "logout" ? acc.active : ""} onClick={() => logOut()}> {t("acc.log")}</li>
        </ul>
      </div>

      <div className={acc.right}>
        {activeTab === "account" && <AccountCon/>}
        {activeTab === "wishlist" && <WishListCon/>}
        {activeTab === "comments" && <CommentCon/> }
      </div>
    </div>
  );
}

export default Account;
