import React, { useState } from "react";
import acc from "./Account.module.css";
import AccountCon from "../AccountContent/AccountCon";
import WishListCon from "../AccountContent/WishListCon";
import CommentCon from "../AccountContent/CommentCon";

function Account() {
  const [activeTab, setActiveTab] = useState("account");

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
          <li
            className={activeTab === "wishlist" ? acc.active : ""}
            onClick={() => setActiveTab("wishlist")}
          >
            Wishlist
          </li>
          <li
            className={activeTab === "comments" ? acc.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            Comments
          </li>
          <li onClick={() => console.log("Çıxış edildi")}>Logout</li>
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
