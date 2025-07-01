import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../redux/features/auth/productSlice";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LuChartNoAxesColumn } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import paymentCard from "./assets/trust_badge.png";
import det from "./Detail.module.css";
import { useTranslation } from "react-i18next";
import { addToBasket } from "../../redux/features/auth/basketSlice";
import { notification } from "antd";
import Review from "../Review/Review";
function DetailSec() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "az" ? "Az" : "En";
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  // useEffect ilə data-nı refresh olanda da gətir
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data.length]);

  const product = data.find((item) => item.id === Number(id));
  const user = useSelector((state) => state.auth.user);

  const [selectedImage, setSelectedImage] = useState("");
  const [imageGallery, setImageGallery] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    if (product) {
      setSelectedImage(product.img);
      setImageGallery([product.thumnailImg, product.img]);
    }
  }, [product]);
 const [api, contextHolder] = notification.useNotification();
  const handleAddToBasket = (product) => {
    if (user) {
      dispatch(addToBasket({ product, size: selectedSize }));
      api.success({
        message: "Added to Basket",
        placement: "topRight",
        showProgress: true,
        duration: 2,
        zIndex: 10000,
      });
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

  useEffect(() => {
    if (product) {
      if (product.small) {
        setSelectedSize("small");
      } else if (product.medium) {
        setSelectedSize("medium");
      } else if (product.large) {
        setSelectedSize("large");
      }
    }
  }, [product]);

  const getPrice = () => {
    switch (selectedSize) {
      case "small":
        return { price: product.smallPrice, discount: product.smallDisPrice };
      case "medium":
        return { price: product.mediumPrice, discount: product.mediumDisPrice };
      case "large":
        return { price: product.largePrice, discount: product.largeDisPrice };
      default:
        return { price: null, discount: null };
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi</p>;
  if (!product) return <p>Məhsul tapılmadı</p>;

  return (
    <div className={det.container}>
      <div className={det.leftSide}>
        <div className={det.gallery}>
          {imageGallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`img-${index}`}
              onClick={() => setSelectedImage(img)}
              className={`${det.thumb} ${
                selectedImage === img ? det.active : ""
              }`}
            />
          ))}
        </div>
        <div className={det.mainImage}>
          {selectedImage && (
            <Zoom>
              <img src={selectedImage} alt="Selected" />
            </Zoom>
          )}
        </div>
        {/* <Review/> */}
      </div>
  {contextHolder}
      <div className={det.DetailCon}>
        <h2 className={det.name}>{product[`name${lang}`]}</h2>
        <p className={det.des}>{product[`description${lang}`]}</p>
        <hr className={det.customHr} />
        <div className={det.info}>
          <p className={det.inf}>
            Rating: <span className={det.iftIt}>{product.rating}</span>
          </p>
          <p className={det.inf}>
            Material:{" "}
            <span className={det.iftIt}>{product[`material${lang}`]}</span>
          </p>
          <p className={det.inf}>
            Condition:{" "}
            <span className={det.iftIt}>{product[`condition${lang}`]}</span>
          </p>

          <div className={det.sizeBox}>
            <span className={det.inf}>Size:</span>

            <div
              className={`
      ${det.sizeOption} 
      ${selectedSize === "small" ? det.activeSize : ""} 
      ${!product.small ? det.disabled : ""}
    `}
              onClick={() => product.small && setSelectedSize("small")}
            >
              S
            </div>

            <div
              className={`
      ${det.sizeOption} 
      ${selectedSize === "medium" ? det.activeSize : ""} 
      ${!product.medium ? det.disabled : ""}
    `}
              onClick={() => product.medium && setSelectedSize("medium")}
            >
              M
            </div>

            <div
              className={`
      ${det.sizeOption} 
      ${selectedSize === "large" ? det.activeSize : ""} 
      ${!product.large ? det.disabled : ""}
    `}
              onClick={() => product.large && setSelectedSize("large")}
            >
              L
            </div>
          </div>

          {/* priceee */}
          <div className={det.priceBox}>
            {getPrice().discount ? (
              <>
                <span className={det.oldPrice}>${getPrice().price}</span>
                <span className={det.newPrice}>${getPrice().discount}</span>
              </>
            ) : (
              <span className={det.newPrice}>${getPrice().price}</span>
            )}
          </div>
          <p className={det.delivery}>Est. Delivery Time 2-3 Days</p>
        </div>
        <button className={det.button} onClick={() => handleAddToBasket(product)}>
          ADD TO CARD
        </button>
        <div className={det.infItem}>
          <div className={det.icon}>
            <div className={det.ic}>
              <FontAwesomeIcon icon={faHeart} />
              Add To Wishlist
            </div>
            <div className={det.ic}>
              <LuChartNoAxesColumn />
              Add to Compare List
            </div>
          </div>
          <div className={det.instock}>In Stock</div>
          <div className={det.social}>
            <div className={`${det.socIcon} ${det.hoverSoc}`}>
              <FaFacebookF />
            </div>
            <div className={`${det.socIcon} ${det.hoverSocTwo}`}>
              <FaXTwitter />
            </div>
            <div className={`${det.socIcon} ${det.hoverSocSec}`}>
              <FaPinterestP />
            </div>
          </div>
          <div className={det.card}>
            <p>Guarantee Safe Checkout</p>
            <img src={paymentCard} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSec;
