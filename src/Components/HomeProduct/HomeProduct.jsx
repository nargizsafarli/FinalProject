import React, { useEffect, useState, useTransition } from "react";
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
import { addToWishlist } from "../../redux/features/auth/wishlistSlice";
import i18n from "../../i18n/i18next";
import ModalProduct from "../ModalProduct/ModalProduct";
import basket from "./assets/download (5).svg";
import det from "./assets/download (6).svg";
import { notification } from "antd";

function HomeProduct() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTransition();
  const currentLang = i18n.language;
  const { data, loading, error } = useSelector((state) => state.product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        message: "Zəhmət olmasa daxil olun",
        description: "Bu funksiyanı istifadə etmək üçün hesabınıza daxil olun.",
        showProgress: true,
        duration: 3,
        zIndex: 9999,
      });
    }
  };
  const handleAddToWishlist = (product) => {
    if (user) {
      dispatch(addToWishlist(product));
      api.success({
        message: "Added to Wishlist",
        placement: "topRight",
        showProgress: true,
        duration: 2,
        zIndex: 10000,
      });
    } else {
      api.warning({
        message: "Please Log In",
        description: "Bu funksiyanı istifadə etmək üçün hesabınıza daxil olun.",
        showProgress: true,
        duration: 3,
        zIndex: 9999,
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

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error}</p>;

  const first12 = data.slice(0, 6);

  return (
    <div className={homepro.container}>
      {contextHolder}
      <h2 className={homepro.title}>Our Products</h2>

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
              <div
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
                      <div className={homepro.comingSoon}>Out of stock...</div>
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
                    {
                      // əgər i18n dili "az" isə nameAz, yoxsa nameEn
                      currentLang === "az" ? product.nameAz : product.nameEn
                    }
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
        <button
          className={homepro.moreBtn}
          onClick={() => navigate(`/${currentLang}/shop`)}
        >
          Daha çox məhsul
        </button>
      </div>
    </div>
  );
}

export default HomeProduct;
