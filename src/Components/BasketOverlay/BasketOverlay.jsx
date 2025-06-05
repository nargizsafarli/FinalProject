import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../../redux/features/auth/basketSlice";
import basket from "./BasketOver.module.css";

const BasketOverlay = ({ isOpen, onClose, currentLang }) => {
  const basketItems = useSelector((state) => state.basket.items);
  const total = useSelector((state) => state.basket.total);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [basketItems, dispatch]);

  if (!isOpen) return null;

  return (
    <>
      <div className={basket.overlay} onClick={onClose}></div>
      <div className={basket.basketSidebar}>
        <h2>Səbət</h2>

        <div className={basket.basketItemsWrapper}>
          {basketItems.length === 0 ? (
            <p>Səbət boşdur</p>
          ) : (
            basketItems.map((item) => {
              let price = 0;

              if (item.size === "small") {
                price = item.product.smallDisPrice || item.product.smallPrice;
              } else if (item.size === "medium") {
                price = item.product.mediumDisPrice || item.product.mediumPrice;
              } else if (item.size === "large") {
                price = item.product.largeDisPrice || item.product.largePrice;
              }

              return (
                <div key={item.id + item.size} className={basket.basketItem}>
                  <img src={item.product.img} alt={item.product.name} />
                  <div>
                    <p>{item.product.name}</p>
                    <p>Ölçü: {item.size}</p>
                    <p>Miqdar: {item.quantity}</p>
                    <p>
                      Qiymət: {price} $ × {item.quantity} ={" "}
                      <strong>{price * item.quantity} $</strong>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className={basket.basketFooter}>
          <p>
            <strong>Cəmi:</strong> {total} $
          </p>
          <button
            onClick={() => {
              navigate(`/${currentLang}/basket`);
              onClose();
            }}
          >
            View Cart
          </button>
          <button>Checkout</button>
        </div>
      </div>
    </>
  );
};

export default BasketOverlay;
