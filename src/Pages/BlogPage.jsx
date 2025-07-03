import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Footer from '../Shared/Footer/Footer'
import Blog from '../Components/Blog/Blog'
import Logo from '../Components/Logo/Logo'

function BlogPage() {
  return (
    <div>
         <Navbar/>
         <Blog/>
         <Logo/>
         <Footer/>
    </div>
  )
}

export default BlogPage