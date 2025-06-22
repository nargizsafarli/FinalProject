import React, { useState } from "react";
import dash from "./Dashboard.module.css";
import TableView from "./TableView";
import adminImg from "./assets/images (1).png"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n/i18next";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { CiLogout } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";
import { RiBloggerLine } from "react-icons/ri";
import { FaRegFileAlt } from "react-icons/fa";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("product");
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const currentLang=i18n.language
  const logoutHandle=()=>{
    dispatch((logoutUser()))
    navigate(`/${currentLang}/login`)
  }
 
  return (
    <div className={dash.container}>
      <div className={dash.leftContainer}>
      <div className={dash.admin}>
        <img src={adminImg} className={dash.adminImg}/>
        <p className={dash.adminName}>Admin</p>
         {/* <div className={dash.openuserbtn} onClick={() =>{logoutHandle()}}><CiLogout />Logout</div> */}
         <p className={dash.adminGmail}>admin@gmail.com</p>
        
      </div>
       {/* <hr className={dash.hrr} */}
       {/* /> */}
        <p
          className={activeTab === "product" ? dash.active : dash.prof}
          onClick={() => setActiveTab("product")}
        >
        <AiOutlineProduct />  Products
        </p>
        <p
          className={activeTab === "profils" ? dash.active : dash.prof}
          onClick={() => setActiveTab("profils")}
        >
         <FaRegUser /> Users
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
        <FaRegFileAlt />  FAQ
        </p>
      </div>
      <div className={dash.rightContainer}>
        <TableView activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Dashboard;
