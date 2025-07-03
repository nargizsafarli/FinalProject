import React, { useState } from "react";
import acc from "./Account.module.css";
import AccountCon from "../AccountContent/AccountCon";
import WishListCon from "../AccountContent/WishListCon";
import CommentCon from "../AccountContent/CommentCon";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import i18n from "../../i18n/i18next";
import { useNavigate } from "react-router-dom";


function Account() {
  const [activeTab, setActiveTab] = useState("account");
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
            Account
          </li>
          <hr  className={acc.hr}/>
          <li
            className={activeTab === "wishlist" ? acc.active : ""}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </li>
          <hr className={acc.hr}/>
          <li
            className={activeTab === "comments" ? acc.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </li>
          <hr  className={acc.hr}/>
          <li  className={activeTab === "logout" ? acc.active : ""} onClick={() => logOut()}>Logout</li>
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
