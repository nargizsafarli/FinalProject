 import React, { useEffect, useState } from 'react'
 import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
 import HomePage from './Pages/HomePage'
 import ShopPage from './Pages/ShopPage'
 import AboutPage from './Pages/AboutPage'
 import ContactPage from './Pages/ContactPage'
 import ScrollTop from './Shared/components/ScrollTop/ScrollTop'
import i18n from './i18n/i18next'
import Navbar from './Shared/Navbar/Navbar'
import DetailPage from './Pages/DetailPage'
import BasketPage from './Pages/BasketPage'
import WishlistPage from './Pages/WishlistPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import FaqPage from './Pages/FaqPage'
import NotFound from './Components/NotFound/NotFound'
import BlogPage from './Pages/BlogPage'
import DetBlog from './Pages/DetBlog'
import CheckOutPage from './Pages/CheckOutPage'
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
          <Route path="/:lang/shop/:id" element={<DetailPage/>}/>
          <Route path='/:lang/basket' element={<BasketPage/>}/>
          <Route path='/:lang/wishlist' element={<WishlistPage/>}/>
          <Route path='/:lang/login' element={<LoginPage/>}/>
          <Route path='/:lang/register' element={<RegisterPage/>}/>
          <Route path='/:lang/faq' element={<FaqPage/>}/>
          <Route path='/:lang/blog' element={<BlogPage/>}/>
          <Route path='/:lang/blog/:id' element={<DetBlog/>}/>
          <Route path=':lang/check' element={<CheckOutPage/>}/>
          <Route path="/" element={<Navigate to={`/${savedLang}`} replace />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
