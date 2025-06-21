import React, { useState } from "react";
import dash from "./Dashboard.module.css";
import TableView from "./TableView";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("product");
  return (
    <div className={dash.container}>
      <div className={dash.leftContainer}>
        <p className={dash.dashText}>Dashboard</p>
        <p
          className={activeTab === "product" ? dash.active : ""}
          onClick={() => setActiveTab("product")}
        >
          Products
        </p>
        <p
          className={activeTab === "profils" ? dash.active : ""}
          onClick={() => setActiveTab("profils")}
        >
          Users
        </p>
        <p
          className={activeTab === "Blog" ? dash.active : ""}
          onClick={() => setActiveTab("Blog")}
        >
          Blogs
        </p>
        <p
          className={activeTab === "faq" ? dash.active : ""}
          onClick={() => setActiveTab("faq")}
        >
          FAQ
        </p>
      </div>
      <div className={dash.rightContainer}>
        <TableView activeTab={activeTab} />
      </div>
    </div>
  );
}

export default Dashboard;
