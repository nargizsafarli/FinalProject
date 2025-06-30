import React from 'react'
import dashNav from "./DashNav.module.css"
import logo from "./assets/logo (1).png"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import i18n from '../../i18n/i18next';
import { logoutUser } from '../../redux/features/auth/authSlice';
import { CiLogout } from "react-icons/ci";
import { IoHomeOutline } from "react-icons/io5";

function DashNav() {
     const dispatch = useDispatch();
      const navigate = useNavigate();
      const currentLang = i18n.language;
      const logoutHandle = () => {
        dispatch(logoutUser());
        navigate(`/${currentLang}/login`);
      };
  return (
    <div className={dashNav.container}>
    <img src={logo} className={dashNav.logo}/>
    <div className={dashNav.con}>
         <div className={dashNav.openuserbtn} onClick={() =>{logoutHandle()}}><CiLogout />Logout</div>
         <div onClick={()=> navigate(`/${currentLang}`)} className={dashNav.home}><IoHomeOutline /></div>
    </div>
    </div>
  )
}

export default DashNav