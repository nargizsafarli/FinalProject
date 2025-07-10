import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  //   faCartPlus,
  faStar as faRegularStar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faStar as faSolidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import homepro from "./HomeProduct.module.css";
import { fetchProducts } from "../../redux/features/auth/productSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/auth/wishlistSlice";
import i18n from "../../i18n/i18next";
import ModalProduct from "../ModalProduct/ModalProduct";
import basket from "./assets/download (5).svg";
import det from "./assets/download (6).svg";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { SpinnerDotted } from "spinners-react";
import 'aos/dist/aos.css';
import Aos from "aos";

function HomeProduct() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentLang = i18n.language;
  const { data, loading, error } = useSelector((state) => state.product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
useEffect(() => {
      Aos.init({
        duration: 800, 
      });
    }, []);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishlist);
  const handleAddToBasket = (product) => {
    if (user) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      api.warning({
        message: t("notif.login"),
        showProgress: true,
        pauseOnHover: false,
        duration: 3,
        zIndex: 9999,
      });
    }
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      api.warning({
        message: t("notif.login"),
        showProgress: true,
        pauseOnHover: false,
        duration: 3,
        zIndex: 9999,
      });
      return;
    }

    const isInWishlist = wishlist.items?.some((item) => item.id === product.id);

    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id)); // eyni action həm əlavə, həm çıxarma üçün işləyir
      api.info({
        message: t("notif.remWish"),
        placement: "topRight",
        showProgress: true,
        duration: 2,
        pauseOnHover: false,
        zIndex: 10000,
      });
    } else {
      dispatch(addToWishlist(product));
      api.success({
        message: t("notif.wish"),
        placement: "topRight",
        pauseOnHover: false,
        showProgress: true,
        duration: 2,
        zIndex: 10000,
      });
    }
  };

  const getDisplayPrice = (product) => {
    if (product.small)
      return { price: product.smallPrice, discount: product.smallDisPrice };
    if (product.medium)
      return { price: product.mediumPrice, discount: product.mediumDisPrice };
    if (product.large)
      return { price: product.largePrice, discount: product.largeDisPrice };
    return { price: "N/A", discount: null };
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <FontAwesomeIcon icon={faSolidStar} key={i} color="#facc15" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <FontAwesomeIcon icon={faStarHalfAlt} key={i} color="#facc15" />
        );
      } else {
        stars.push(
          <FontAwesomeIcon icon={faRegularStar} key={i} color="#facc15" />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <SpinnerDotted size={70} thickness={100} speed={100} color="green" />
      </div>
    );
  }
  if (error) return <p>Xəta baş verdi: {error}</p>;

  const first12 = data.slice(0, 6);

  return (
    <div className={homepro.container}>
      {contextHolder}
      <h2 className={homepro.title} data-aos="fade-up">{t("pro.proName")}</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 1 },
          375: { slidesPerView: 1 },
          540: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className={homepro.swiper}
      >
        {first12.map((product) => {
          const { price, discount } = getDisplayPrice(product);
          return (
            <SwiperSlide key={product.id}>
              <div data-aos="zoom-in"
                className={`${homepro.card} ${
                  !product.isStock ? homepro.outOfStock : ""
                }`}
              >
                <div className={homepro.imageWrapper}>
                  <img
                    src={product.img}
                    alt={product.nameEn}
                    className={homepro.mainImg}
                  />
                  <img
                    src={product.thumnailImg}
                    alt="Hover"
                    className={homepro.hoverImg}
                  />

                  {/* OUT OF STOCK OVERLAY */}
                  {!product.isStock && (
                    <>
                      <div className={homepro.stockOverlay}></div>
                      <div className={homepro.comingSoon}>{t("pro.stock")}</div>
                    </>
                  )}

                  {/* OVERLAY İCONS – ANCAQ STOKDADIRSA */}
                  {product.isStock && (
                    <div className={homepro.cardOverlay}>
                      <div
                        className={`${homepro.overIcon} ${
                          wishlist.items?.some((item) => item.id === product.id)
                            ? homepro.active
                            : ""
                        }`}
                        onClick={() => handleAddToWishlist(product)}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </div>

                      <div
                        className={homepro.overIcon}
                        onClick={() => handleAddToBasket(product)}
                      >
                        <img
                          src={basket}
                          className={homepro.overImg}
                          alt="Basket"
                        />
                      </div>
                      <div
                        className={homepro.overIcon}
                        onClick={() =>
                          navigate(`/${currentLang}/shop/${product.id}`)
                        }
                      >
                        <img
                          src={det}
                          className={homepro.overImg}
                          alt="Detail"
                        />
                      </div>
                    </div>
                  )}

                  {/* MODAL */}
                  <ModalProduct
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                  />
                </div>

                {/* CARD INFO */}
                <div className={homepro.cardInfo}>
                  <p className={homepro.name}>
                    {currentLang === "az" ? product.nameAz : product.nameEn}
                  </p>
                  <div className={homepro.rating}>
                    {renderStars(product.rating)}
                  </div>
                  <div className={homepro.price}>
                    {discount ? (
                      <>
                        <span className={homepro.oldPrice}>${price}</span>
                        <span className={homepro.newPrice}>${discount}</span>
                      </>
                    ) : (
                      <span className={homepro.pri}>${price}</span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={homepro.moreBtnWrapper}>
        <button data-aos="zoom-in"
          className={homepro.moreBtn}
          onClick={() => navigate(`/${currentLang}/shop`)}
        >
          {t("pro.morePro")}
        </button>
      </div>
    </div>
  );
}

export default HomeProduct;
