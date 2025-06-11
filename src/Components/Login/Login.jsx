import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import log from "./Login.module.css";
import { loginUser } from "../../redux/features/auth/authSlice";



function Login() {
  const dispatch = useDispatch();
  const { loading, loginError } = useSelector((state) => state.auth);

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
      <h1>Login form</h1>
      <form className={log.auth} onSubmit={handleSubmit}>
        {loginError && <p className={log.error}>{loginError}</p>}
        <div className={log.form}>
          <input className={log.input} type="email" id="email" value={email} placeholder="Email *" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={log.form}>
          <input className={log.input} type="password" id="password" placeholder="Password *" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className={log.button}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
