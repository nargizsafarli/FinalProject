import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../redux/features/auth/productSlice";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import paymentCard from "./assets/trust_badge.png";
import det from "./Detail.module.css";
import { useTranslation } from "react-i18next";
import { addToBasket } from "../../redux/features/auth/basketSlice";
import { notification } from "antd";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/features/auth/wishlistSlice";
import { SpinnerDotted } from "spinners-react";

function DetailSec() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "az" ? "Az" : "En";
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  const wishlist = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.auth.user);
  const [api, contextHolder] = notification.useNotification();

  const [selectedImage, setSelectedImage] = useState("");
  const [imageGallery, setImageGallery] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data.length]);

  const product = data.find((item) => item.id === Number(id));

  useEffect(() => {
    if (product) {
      setSelectedImage(product.img);
      setImageGallery([product.thumnailImg, product.img]);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      if (product.small) setSelectedSize("small");
      else if (product.medium) setSelectedSize("medium");
      else if (product.large) setSelectedSize("large");
    }
  }, [product]);

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
        duration: 3,
        showProgress: true,
        zIndex: 9999,
      });
    }
  };

  const isInWishlist = wishlist.some((item) => item.id === product?.id);

  const handleAddToWishlist = (product) => {
    if (user) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        api.info({
          message: "Removed from Wishlist",
          placement: "topRight",
          showProgress: true,
          duration: 2,

          zIndex: 10000,
        });
      } else {
        dispatch(addToWishlist(product));
        api.success({
          message: "Added to Wishlist",
          placement: "topRight",
          duration: 2,
          showProgress: true,
          zIndex: 10000,
        });
      }
    } else {
      api.warning({
        message: "Please log in",
        showProgress: true,
        duration: 2,
        zIndex: 9999,
      });
    }
  };

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
      </div>

      {contextHolder}

      <div className={det.DetailCon}>
        <h2 className={det.name}>{product[`name${lang}`]}</h2>
        <p className={det.des}>{product[`description${lang}`]}</p>
        <hr className={det.customHr} />

        <div className={det.info}>
          <p className={det.inf}>
            {t("det.mat")} <span className={det.iftIt}>{product.rating}</span>
          </p>
          <p className={det.inf}>
            {t("det.mat")}{" "}
            <span className={det.iftIt}>{product[`material${lang}`]}</span>
          </p>
          <p className={det.inf}>
            {t("det.con")}{" "}
            <span className={det.iftIt}>{product[`condition${lang}`]}</span>
          </p>

          <div className={det.sizeBox}>
            <span className={det.inf}>{t("det.size")}</span>

            {["small", "medium", "large"].map((size) => (
              <div
                key={size}
                className={`
                  ${det.sizeOption}
                  ${selectedSize === size ? det.activeSize : ""}
                  ${!product[size] ? det.disabled : ""}
                `}
                onClick={() => product[size] && setSelectedSize(size)}
              >
                {size[0].toUpperCase()}
              </div>
            ))}
          </div>

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

          <p className={det.delivery}>{t("det.del")}</p>
        </div>

        <button
          className={det.button}
          onClick={() => handleAddToBasket(product)}
        >
          {t("det.add")}
        </button>

        <div className={det.infItem}>
          <div className={det.icon}>
            <div
              className={det.ic}
              onClick={() => handleAddToWishlist(product)}
            >
              <FontAwesomeIcon
                icon={isInWishlist ? faHeartSolid : faHeartRegular}
                className={det.heartIcon}
              />
              {isInWishlist ? t("det.addedWish") : t("det.addWish")}
            </div>
          </div>

          <div className={det.instock}> {t("det.sto")}</div>

          <div className={det.social}>
            <a
              href="https://www.facebook.com"
              target="_blank"
              className={`${det.socIcon} ${det.hoverSoc}`}
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              className={`${det.socIcon} ${det.hoverSocTwo}`}
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${det.socIcon} ${det.hoverSocSec}`}
            >
              <FaPinterestP />
            </a>
          </div>

          <div className={det.card}>
            <p>{t("det.check")}</p>
            <img src={paymentCard} alt="trust" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSec;
