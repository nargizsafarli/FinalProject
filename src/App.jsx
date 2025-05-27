 import React, { useEffect, useState } from 'react'
 import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
 import HomePage from './Pages/HomePage'
 import ShopPage from './Pages/ShopPage'
 import AboutPage from './Pages/AboutPage'
 import ContactPage from './Pages/ContactPage'
 import ScrollTop from './Shared/components/ScrollTop/ScrollTop'
import i18n from './i18n/i18next'
import Navbar from './Shared/Navbar/Navbar'
const App = () => {
  const [savedLang, setSavedLang] = useState(null);
  

 useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "en";
    setSavedLang(lang);

    const handleLangChange = (lng) => {
      setSavedLang(lng);
    };

    i18n.on("languageChanged", handleLangChange);

    return () => {
     i18n.off("languageChanged", handleLangChange);
    };
  }, []);

  if (!savedLang) return null; // Dil təyin olunana qədər render etmə

  return (
    <div>
      <BrowserRouter>
        <ScrollTop/>
       <Navbar/>
        <Routes>
          <Route path="/:lang" element={<HomePage />} />
          <Route path="/:lang/shop" element={<ShopPage />} />
          <Route path="/:lang/about" element={<AboutPage />} />
          <Route path="/:lang/contact" element={<ContactPage />} />
          {/* Əgər uyğun route tapılmasa, savedLang-a yönləndir */}
          <Route path="*" element={<Navigate to={`/${savedLang}`} replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
