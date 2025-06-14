import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import reg from "./Register.module.css";
import { registerUser } from "../../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n/i18next";

function Register() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
    const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
   const currentLang =i18n.language
  const validateForm = () => {
    let errors = {};
    if (!name) errors.name = "Ad daxil edilməlidir.";
    if (!surname) errors.surname = "Soyad daxil edilməlidir.";
    if (!email || !/\S+@\S+\.\S+/.test(email))
      errors.email = "Email (@gmail.com) formatında olmalıdır!";
    if (!password || password.length < 6)
      errors.password = "Şifrə ən azı 6 simvoldan ibarət olmalıdır.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    if (!validateForm()) return;

    try {
      await dispatch(registerUser({ name, surname, email, password })).unwrap();
      alert("Qeydiyyat uğurla başa çatdı.");
      navigate(`/${currentLang}/login`);
    } catch (err) {
      setGeneralError(err);
    }
  };

  return (
  <div className={reg.container}>
  
    <div className={reg.con}>
      <h1 className={reg.heading}>Register form</h1>
      <form className={reg.auth} onSubmit={handleSubmit}>
        {generalError && <p className={reg.generalError}>{generalError}</p>}

        <div className={reg.formRow}>
          <label htmlFor="name">First Name<span className={reg.important}>*</span></label>
          <div className={reg.inputGroup}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {formErrors.name && <p className={reg.error}>{formErrors.name}</p>}
          </div>
        </div>

        <div className={reg.formRow}>
          <label htmlFor="surname">Last Name<span className={reg.important}>*</span></label>
          <div className={reg.inputGroup}>
            <input
              type="text"
              id="surname"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {formErrors.surname && <p className={reg.error}>{formErrors.surname}</p>}
          </div>
        </div>

        <div className={reg.formRow}>
          <label htmlFor="email">Email<span className={reg.important}>*</span></label>
          <div className={reg.inputGroup}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {formErrors.email && <p className={reg.error}>{formErrors.email}</p>}
          </div>
        </div>

        <div className={reg.formRow}>
          <label htmlFor="password">Password<span className={reg.important}>*</span></label>
          <div className={reg.inputGroup}>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {formErrors.password && <p className={reg.error}>{formErrors.password}</p>}
          </div>
        </div>

        <button type="submit" className={reg.button}> {loading ? "Registering..." : "Register"}</button>

        <p className={reg.redirect}>
          Artıq hesabınız var? <Link to={`/${currentLang}/login`}>Giriş</Link>
        </p>
      </form>
    </div>
  </div>
);

}

export default Register;
