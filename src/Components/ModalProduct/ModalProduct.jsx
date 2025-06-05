// components/ModalProduct.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import mod from "./ModalProduct.module.css";
import { addToBasket } from "../../redux/features/auth/basketSlice";

function ModalProduct({ isOpen, onClose, product }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSize(null);
      setCurrentPrice(0);
    }
  }, [isOpen]);

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
      alert("Please select a size");
      return;
    }

    dispatch(addToBasket({ product, size: selectedSize }));
    onClose();
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
        <div className={mod.left}>
          <img src={product.img} alt={product.name} className={mod.image} />
        </div>

        <div className={mod.right}>
          <h2>{product.nameEn}</h2>
          <p>{product.descriptionEn}</p>

          <div className={mod.priceBlock}>
            <span className={mod.priceLabel}>Price:</span>
            <span className={mod.priceValue}>
              {currentPrice > 0 ? `${currentPrice}$` : "Select a size"}
            </span>
          </div>

          {/* Size Options like DetailSec */}
          <div className={mod.sizeBox}>
            <span className={mod.sizeLabel}>Size:</span>

            <div
              className={`${mod.sizeOption} ${selectedSize === "small" ? mod.activeSize : ""} ${!product.small ? mod.disabled : ""}`}
              onClick={() => product.small && setSelectedSize("small")}
            >
              S
            </div>

            <div
              className={`${mod.sizeOption} ${selectedSize === "medium" ? mod.activeSize : ""} ${!product.medium ? mod.disabled : ""}`}
              onClick={() => product.medium && setSelectedSize("medium")}
            >
              M
            </div>

            <div
              className={`${mod.sizeOption} ${selectedSize === "large" ? mod.activeSize : ""} ${!product.large ? mod.disabled : ""}`}
              onClick={() => product.large && setSelectedSize("large")}
            >
              L
            </div>
          </div>

          <Button
          
             className={mod.customAddBtn}
            onClick={handleAddToBasket}
          >
            Add to Basket
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ModalProduct;
