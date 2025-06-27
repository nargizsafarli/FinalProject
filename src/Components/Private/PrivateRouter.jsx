import React from 'react'
import { useSelector } from 'react-redux';
import i18n from '../../i18n/i18next';
import { Navigate } from 'react-router-dom';

function PrivateRouter({children, adminOnly = false}) {
     const user = useSelector((state) => state.auth.user);
     const currentLang=i18n.language
     if (!user) {
    return <Navigate to={`/${currentLang}/login`} replace />;
  }
    if (adminOnly) {
    const isAdmin = user?.name === "Admin" && user?.email === "admin@gmail.com";
    if (!isAdmin) {
      return <Navigate to={`/${currentLang}`} replace />;
    }
  }
  return children
}

export default PrivateRouter