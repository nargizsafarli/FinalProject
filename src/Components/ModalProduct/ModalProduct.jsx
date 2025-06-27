// components/ModalProduct.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import mod from "./ModalProduct.module.css";
import { addToBasket } from "../../redux/features/auth/basketSlice";
import i18n from "../../i18n/i18next";
import { useTranslation } from "react-i18next";

function ModalProduct({ isOpen, onClose, product }) {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [sizeError, setSizeError] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSize(null);
      setCurrentPrice(0);
    }
  }, [isOpen]);

  const currentLang = i18n.language;
  const {t}=useTranslation()
  useEffect(() => {
    if (!product || !selectedSize) return;

    let price = 0;
    if (selectedSize === "small") {
      price = product.smallDisPrice || product.smallPrice;
    } else if (selectedSize === "medium") {
      price = product.mediumDisPrice || product.mediumPrice;
    } else if (selectedSize === "large") {
      price = product.largeDisPrice || product.largePrice;
    }

    setCurrentPrice(price);
  }, [selectedSize, product]);

  const handleAddToBasket = () => {
    if (!selectedSize) {
      setSizeError(true);

      setTimeout(() => {
        setSizeError(false);
      }, 2000);

      return;
    }

    dispatch(addToBasket({ product, size: selectedSize }));
    onClose();

    setTimeout(() => {
      api.success({
        message: "Added to Basket",
        placement: "topRight",
        duration: 2,
        showProgress: true,
        zIndex: 10000,
      });
    }, 400);
  };

  if (!product) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={750}
      zIndex={9999999}
      styles={{
        mask: { backgroundColor: "rgba(37, 37, 37, 0.2)" },
      }}
      
    >
      <div className={mod.modalContainer}>
        {contextHolder}
        <div className={mod.left}>
          <img src={product.img} alt={product.name} className={mod.image} />
        </div>

        <div className={mod.right}>
          <h2 className={mod.name}>
            {currentLang === "az" ? product.nameAz : product.nameEn}
          </h2>
          <p className={mod.des}>  {
                    
                      currentLang === "az" ? product.descriptionAz : product.descriptionEn
                    }</p>

          <div className={mod.priceBlock}>
            <span className={mod.inf}> {t("modPro.price")}</span>
            <span
              className={`${mod.priceValue} ${sizeError ? mod.errorText : ""}`}
            >
              {sizeError
                ? t("modPro.sel2")
                : currentPrice > 0
                ? `${currentPrice}$`
                : t("modPro.sel")}
            </span>
          </div>

          {/* Size Options like DetailSec */}
          <div className={mod.sizeBox}>
            <span className={mod.inf}> {t("modPro.size")}</span>

            <div
              className={`${mod.sizeOption} ${
                selectedSize === "small" ? mod.activeSize : ""
              } ${!product.small ? mod.disabled : ""}`}
              onClick={() => product.small && setSelectedSize("small")}
            >
              S
            </div>

            <div
              className={`${mod.sizeOption} ${
                selectedSize === "medium" ? mod.activeSize : ""
              } ${!product.medium ? mod.disabled : ""}`}
              onClick={() => product.medium && setSelectedSize("medium")}
            >
              M
            </div>

            <div
              className={`${mod.sizeOption} ${
                selectedSize === "large" ? mod.activeSize : ""
              } ${!product.large ? mod.disabled : ""}`}
              onClick={() => product.large && setSelectedSize("large")}
            >
              L
            </div>
          </div>

          <Button className={mod.customAddBtn} onClick={handleAddToBasket}>
           {t("modPro.bask")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalProduct;
