import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import log from "./Login.module.css";
import { loginUser } from "../../redux/features/auth/authSlice";
import i18n from "../../i18n/i18next";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Swal from "sweetalert2";

function Login() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentLang = i18n.language;
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setEmail("");
      setPassword("");
      Swal.fire({
      icon: 'success',
      title: t("notif.log"),
    });
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
     <div className={log.mainCon}>
    <div className={log.container}>
      <form className={log.auth} onSubmit={handleSubmit}>
        <h1 className={log.title}>{t("login.form")}</h1>
        {error && <p className={log.error}>{error}</p>}

        <div className={log.formRow}>
          <label htmlFor="email">
            {t("login.email")}
            <span className={log.important}>*</span>
          </label>
          <input
          required
            className={log.input}
            type="email"
            id="email"
            value={email}
            // placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={log.formRow}>
          <label htmlFor="password">
            {t("login.password")}
            <span className={log.important}>*</span>
          </label>
          <input
          required
            className={log.input}
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            // placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className={log.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </div>
        </div>

        <div className={log.actions}>
          <div className={log.formRow}>
            <label htmlFor="password"></label>
            <button type="submit" className={log.button}>
              {" "}
              {loading ? t("login.logining") : t("login.log")}
            </button>
          </div>
          <p className={log.redirect}>
            {t("login.art")}
            <Link className={log.link} to={`/${currentLang}/register`}>
              {" "}
              {t("login.login")}
            </Link>
          </p>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Login;
