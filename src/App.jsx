import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import ShopPage from './Pages/ShopPage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import ScrollTop from './Shared/components/ScrollTop/ScrollTop'

function App() {
  return (
    <div>
      <BrowserRouter>
      <ScrollTop/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='shop' element={<ShopPage/>}/>
          <Route path='about' element={<AboutPage/>}/>
          <Route path='contact' element={<ContactPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App