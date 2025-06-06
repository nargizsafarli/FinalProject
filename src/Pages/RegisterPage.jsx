import React from 'react'
import Navbar from '../Shared/Navbar/Navbar'
import Register from '../Components/Register/Register'
import Footer from '../Shared/Footer/Footer'
import AuthHeader from '../Components/AuthHeader/AuthHeader'

function RegisterPage() {
  return (
    <div>
        <Navbar/>
        <AuthHeader title="Create an Account" subtitle="Register"/>
        <Register/>
        <Footer/>
    </div>
  )
}

export default RegisterPage