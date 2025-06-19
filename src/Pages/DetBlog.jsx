import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'

import Footer from '../Shared/Footer/Footer'
import BlogDetail from '../Components/BlogDetail/BlogDetail'


function DetBlog() {
  return (
    <div>
        <Navbar/>
       <BlogDetail/>
        <Footer/>
    </div>
  )
}

export default DetBlog