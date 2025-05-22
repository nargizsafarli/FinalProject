import React, { useEffect, useState } from "react";
import nav from "./Navbar.module.css";
import logo from "./assets/logo (1).png";
import { FaRegUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { BiBasket } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import ChangeLang from "../../Components/ChangeLang/ChangeLang";
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const { t } = useTranslation();

  return (
    <div className={nav.mainContainer}>
      {mobileOpen && (
        <div
          className={`${nav.overlay} ${mobileOpen ? nav.overlayOpen : ""}`}
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
      <div className={nav.dektopContainer}></div>

      <div className={nav.dektopContainer}>
        <div
          className={nav.mobileIcon}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <FaBars />
        </div>
        <img src={logo} className={nav.logo} />
        <div className={nav.desktop}>
          <div className={nav.link}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.home")}
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.shop")}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.about")}
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.contact")}
            </NavLink>
            <div className={nav.pagesWrapper}>
              <NavLink className={nav.linkItem}>
                <div className={nav.opens}>
                  {t("navbar.about")} <IoIosArrowUp className={nav.arrowIcon} />
                </div>
                <div className={nav.openDesktopPage}>
                  <div className={nav.pag}>{t("pages.faq")}</div>
                  <div className={nav.pag}>{t("pages.blog")}</div>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className={nav.icons}>
          <div className={`${nav.changeLang}`}>
            <ChangeLang />
          </div>
          <div className={nav.user}>
            <FaRegUser />
            <div className={nav.userOpen}>
              <p>{t("pages.login")}</p>
            </div>
          </div>
          <FontAwesomeIcon icon={faHeart} />
          <BiBasket />
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </div>
      </div>
      <div className={`${nav.mobileNav} ${mobileOpen ? nav.open : ""}`}>
        {mobileOpen && (
          <div className={nav.navItem}>
            <div className={nav.exit}>
              {t("pages.menu")}
              <div
                className={nav.closeIcon}
                onClick={() => setMobileOpen(false)}
              >
                <FaTimes />
              </div>
            </div>
            <div className={nav.mobileNavLink}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.home")}
              </NavLink>
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.shop")}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.about")}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.contact")}
              </NavLink>
              <NavLink
                onClick={() => setOpenPage(!openPage)}
                className={nav.linkItem}
              >
                {t("navbar.pages")}{" "}
                {openPage ? <IoIosArrowDown /> : <IoIosArrowUp />}
                {openPage && (
                  <div>
                    <div className={nav.pag}>{t("pages.faq")}</div>
                    <div className={nav.pag}>{t("pages.blog")}</div>
                  </div>
                )}
              </NavLink>
              <ChangeLang/>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
