import React, { useState } from "react";
import dash from "./Dashboard.module.css";
import TableView from "./TableView";
import adminImg from "./assets/images (1).png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n/i18next";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { CiLogout } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { RiBloggerLine } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";
import ChartView from "./ChartView";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("product");
 

  return (
    <div className={dash.container}>
      <div className={dash.leftContainer}>
        <div className={dash.admin}>
          <img src={adminImg} className={dash.adminImg} />
          <p className={dash.adminName}>Admin</p>
         
          <p className={dash.adminGmail}>admin@gmail.com</p>
        </div>
        {/* <hr className={dash.hrr} */}
        {/* /> */}
        {/* <p
          className={activeTab === "chart" ? dash.active : dash.prof}
          onClick={() => setActiveTab("chart")}
        >
          📊 Chart
        </p> */}
        <p
          className={activeTab === "product" ? dash.active : dash.prof}
          onClick={() => setActiveTab("product")}
        >
          <AiOutlineProduct /> Products
        </p>
        <p
          className={activeTab === "profils" ? dash.active : dash.prof}
          onClick={() => setActiveTab("profils")}
        >
          <FaRegUser /> Users
        </p>
         <p
          className={activeTab === "review" ? dash.active : dash.prof}
          onClick={() => setActiveTab("review")}
        >
          <AiOutlineProduct /> Comment
        </p>
        <p
          className={activeTab === "Blog" ? dash.active : dash.prof}
          onClick={() => setActiveTab("Blog")}
        >
          <RiBloggerLine /> Blogs
        </p>
        <p
          className={activeTab === "faq" ? dash.active : dash.prof}
          onClick={() => setActiveTab("faq")}
        >
          <FaRegFileAlt /> FAQ
        </p>
      </div>
      {/* <div className={dash.rightContainer}>
  {activeTab === "chart" ? (
    <ChartView/>
  ) : (
    <TableView activeTab={activeTab} />
  )}
</div> */}
<div className={dash.rightContainer}>
 <TableView activeTab={activeTab} />
</div>

    </div>
  );
}

export default Dashboard;
