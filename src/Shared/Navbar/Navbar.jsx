import React, { useEffect, useState } from 'react'
import nav from "./Navbar.module.css"
import logo from "./assets/logo (1).png"
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from 'react-router-dom'
import { BiBasket } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
  const [mobileOpen,setMobileOpen]=useState(false)
  const [openPage,setOpenPage]=useState(false)
   const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30); // 30px-dən çox scroll olunubsa
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={nav.mainContainer}>
    {mobileOpen && <div className={`${nav.overlay} ${mobileOpen ? nav.overlayOpen : ""}`} onClick={() => setMobileOpen(false)}></div>}
      <div className={`${nav.dektopContainer} ${isScrolled ? nav.scrolledNavbar : ""}`}></div>

    <div className={nav.dektopContainer}>
        <div className={nav.mobileIcon} onClick={() => setMobileOpen(!mobileOpen)}><FaBars/></div>
        <img src={logo} className={nav.logo}/>
        <div className={nav.desktop}>
        <div className={nav.link}>
          <NavLink to="/" className={({isActive})=>isActive? nav.activeLink : ""}>Home</NavLink>
          <NavLink to="/shop" className={({isActive})=>isActive? nav.activeLink : ""}>Shop</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? nav.activeLink : ""}>About Us</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? nav.activeLink : ""}>Contact Us</NavLink>
          {/* <NavLink className={nav.openNav} onClick={() => setOpenPage(!openPage)}>Pages {openPage ? <IoIosArrowDown />:<IoIosArrowUp /> }
          {openPage &&(
              <div className={nav.openDesktopPage}>
              <div>FAQ</div>
              <div>Blog</div>
              </div>
           )} */}
           <div className={nav.pagesWrapper}>
          <NavLink className={nav.openNav}>
            <div className={nav.opens}>Pages <IoIosArrowUp className={nav.arrowIcon}/></div>
            <div className={nav.openDesktopPage}>
              <div>FAQ</div>
              <div>Blog</div>
             </div>
          </NavLink>
          </div>
        </div>
        </div>
        <div className={nav.icons}>
        <FontAwesomeIcon icon={faCircleHalfStroke} />
        <div className={nav.user}> 
        <FaRegUser  />
        <div className={nav.userOpen}>
          <p>Login</p>
        </div>
        </div>
        <FontAwesomeIcon icon={faHeart} />
        <BiBasket/>
        </div>
    </div> 
    <div className={`${nav.mobileNav} ${mobileOpen ? nav.open : ""}`}>
      {mobileOpen && (
        <div className={nav.navItem}>
        <div className={nav.exit}>
          Menu
          <div className={nav.closeIcon} onClick={() => setMobileOpen(false)}><FaTimes /></div>
        </div>
        <div className={nav.mobileNavLink}>
         <NavLink to="/" className={({isActive})=>isActive? nav.activeLink : ""}>Home</NavLink>
          <NavLink to="/shop" className={({isActive})=>isActive? nav.activeLink : ""}>Shop</NavLink>
          <NavLink to="/about" className={({isActive})=>isActive? nav.activeLink : ""}>About US</NavLink>
          <NavLink to="/contact" className={({isActive})=>isActive? nav.activeLink : ""}>Contact Us</NavLink>
          <NavLink onClick={() => setOpenPage(!openPage)}>Pages {openPage ? <IoIosArrowDown />:<IoIosArrowUp />}
            {openPage &&(
              <div>
              <div>FAQ</div>
              <div>Blog</div>
              </div>
           )}
          </NavLink>
          </div>
        </div>
       )}
    </div>
    </div>
  )
}

export default Navbar