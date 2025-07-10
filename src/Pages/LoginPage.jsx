import React from "react";
import Login from "../Components/Login/Login";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

import { useTranslation } from "react-i18next";
import Commom from "../Shared/components/Commom/Commom";

function LoginPage() {
  const {t}=useTranslation()
  return (
    <div>
      <Navbar />
      <Commom title={t("el.log")} subtitle={t("el.lo")}/>
      <Login />
      <Footer/>
    </div>
  );
}

export default LoginPage;
