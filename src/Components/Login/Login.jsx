import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import log from "./Login.module.css";
import { loginUser } from "../../redux/features/auth/authSlice";
import i18n from "../../i18n/i18next";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const currentLang = i18n.language;
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email və şifrə mütləqdir.");
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setEmail("");
      setPassword("");
      alert("login succesful");
    } catch (err) {
      console.log("Login error:", err);
    }
  };

  return (
    <div className={log.container}>
      <form className={log.auth} onSubmit={handleSubmit}>
        <h1 className={log.title}>Login form</h1>
        {error && <p className={log.error}>{error}</p>}

        <div className={log.formRow}>
          <label htmlFor="email">
            Email <span className={log.important}>*</span>
          </label>
          <input
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
            Password <span className={log.important}>*</span>
          </label>
          <input
            className={log.input}
            type="password"
            id="password"
            value={password}
            // placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={log.actions}>
          <button type="submit" className={log.button}>
            {loading ? "Loading..." : "Login"}
          </button>
          <p className={log.redirect}>
            Hesabın yoxdur?
            <Link to={`/${currentLang}/register`}>Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
