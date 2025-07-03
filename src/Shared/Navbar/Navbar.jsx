import React, { useEffect, useState } from "react";
import nav from "./Navbar.module.css";
import logo from "./assets/logo (1).png";
import { FaRegUser } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
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
import i18n from "../../i18n/i18next";
import BasketOverlay from "../../Components/BasketOverlay/BasketOverlay";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/features/auth/authSlice";
import { toggleTheme } from "../../redux/features/auth/themeSlice";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import "..//../index.css";
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openPage, setOpenPage] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const basketCount = useSelector((state) =>
    state.basket.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const theme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.auth.user);

  const logOut = () => {
    dispatch(logoutUser());
    navigate(`/${currentLang}`);
  };

  const currentLang = i18n.language;
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
              // to="/"
              to={`/${currentLang}`}
              end
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.home")}
            </NavLink>
            <NavLink
              // to="/shop"
              to={`/${currentLang}/shop`}
              end
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.shop")}
            </NavLink>
            <NavLink
              // to="/about"
              to={`/${currentLang}/about`}
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.about")}
            </NavLink>
            <NavLink
              // to="/contact"
              to={`/${currentLang}/contact`}
              className={({ isActive }) =>
                `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
              }
            >
              {t("navbar.contact")}
            </NavLink>
            <div className={nav.pagesWrapper}>
              <div className={nav.linkItem}>
                <div className={nav.opens}>
                  {t("navbar.pages")} <IoIosArrowUp className={nav.arrowIcon} />
                </div>
                <div className={nav.openDesktopPage}>
                  <NavLink
                    to={`/${currentLang}/faq`}
                    className={({ isActive }) =>
                      `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                    }
                  >
                    {t("pages.faq")}
                  </NavLink>
                  <NavLink
                    to={`/${currentLang}/blog`}
                    className={({ isActive }) =>
                      `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                    }
                  >
                    {t("pages.blog")}
                  </NavLink>
                </div>
              </div>
            </div>
            {/* !DAshboarddd */}
            {user?.name === "Admin" && user?.email === "admin@gmail.com" && (
              <NavLink
                to={`/${currentLang}/dashboard`}
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
        <div className={nav.icons}>
          <div className={`${nav.changeLang}`}>
            <ChangeLang />
          </div>

          {user ? (
            <div className={nav.user}>
              <FaRegUser />
              <div className={nav.userOpen}>
                <p
                  onClick={() => {
                    navigate(`/${currentLang}/account`);
                  }}
                >
                  {user.name}
                </p>
                <div
                  className={nav.openuserbtn}
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </div>
              </div>
            </div>
          ) : (
            <div
              className={nav.user}
              onClick={() => navigate(`/${currentLang}/register`)}
            >
              <FaRegUser className={nav.userIcon} />
            </div>
          )}

          <div className={nav.navWrap}>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => navigate(`/${currentLang}/wishlist`)}
            />
            <span className={nav.badge}>{wishlistCount}</span>
          </div>
          <div className={nav.navWrap}>
            <BiBasket
              //  onClick={()=>navigate(`/${currentLang}/basket`)}
              onClick={() => setIsBasketOpen(true)}
              className={nav.baskk}
            />
            <span className={nav.badge}>{basketCount}</span>
          </div>
          <BasketOverlay
            isOpen={isBasketOpen}
            onClose={() => setIsBasketOpen(false)}
            currentLang={currentLang}
          />
          <div onClick={() => dispatch(toggleTheme())}>
            {theme === "light" ? <MdOutlineDarkMode className={nav.baskk}/> : <MdOutlineLightMode className={nav.baskk}/>}
          </div>
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
                to={`/${currentLang}`}
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.home")}
              </NavLink>
              <NavLink
                // to="/shop"
                to={`/${currentLang}/shop`}
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.shop")}
              </NavLink>
              <NavLink
                // to="/about"
                to={`/${currentLang}/about`}
                className={({ isActive }) =>
                  `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                }
              >
                {t("navbar.about")}
              </NavLink>
              <NavLink
                // to="/contact"
                to={`/${currentLang}/contact`}
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
                    <NavLink
                      className={({ isActive }) =>
                        `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                      }
                    >
                      {t("pages.faq")}
                    </NavLink>
                    <NavLink
                      className={({ isActive }) =>
                        `${nav.linkItem} ${isActive ? nav.activeLink : ""}`
                      }
                    >
                      {t("pages.blog")}
                    </NavLink>
                  </div>
                )}
              </NavLink>
              <ChangeLang />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
