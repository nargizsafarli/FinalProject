import React from "react";
import Login from "../Components/Login/Login";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import AuthHeader from "../Components/AuthHeader/AuthHeader";

function LoginPage() {
  return (
    <div>
      <Navbar />
      <AuthHeader title="Log in to your account" subtitle="Log in"/>
      <Login />
      <Footer/>
    </div>
  );
}

export default LoginPage;
