import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../../redux/features/auth/basketSlice";
import basket from "./BasketOver.module.css";
import { getPrices } from "../../Utils/getprice";

const BasketOverlay = ({ isOpen, onClose, currentLang }) => {
  const basketItems = useSelector((state) => state.basket.items);
  const total = useSelector((state) => state.basket.total);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [basketItems, dispatch]);

  return (
    <>
      <div
        className={`${basket.overlay} ${isOpen ? basket.overlayOpen : ""}`}
        onClick={onClose}
      ></div>

      <div
        className={`${basket.basketSidebar} ${
          isOpen ? basket.basketSidebarOpen : ""
        }`}
      >
        <h2 className={basket.text}>Shopping Cart</h2>
        <hr className={basket.hrr} />

        <div className={basket.basketItemsWrapper}>
          {basketItems.length === 0 ? (
            <p>Səbət boşdur</p>
          ) : (
            basketItems.map((item) => {
              const { original, discount } = getPrices(item.product, item.size);
              const price = discount || original;

              return (
                <div key={`${item.id}-${item.size}`} className={basket.basketItem}>
                  <div className={basket.card}>
                    <img src={item.product.img} alt={item.product.name} />
                    <div className={basket.cardBody}>
                      <p className={basket.name}>{item.product.nameEn}</p>
                      <p className={basket.size}>{item.size}</p>
                      <p className={basket.price}>
                        {item.quantity} ×{" "}
                        {discount ? (
                          <>
                            <s className={basket.oldPrice}>{original}$</s>{" "}
                            <span className={basket.pric}>{discount}$</span>
                          </>
                        ) : (
                          <span className={basket.pric}>{original}$</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <hr className={basket.hrr} />
                </div>
              );
            })
          )}
        </div>

        <hr className={basket.hrr} />
        <div className={basket.basketFooter}>
          <p className={basket.total}>
            <span>Total:</span>
            <span className={basket.totalPrice}>${total}</span>
          </p>

          <div className={basket.buttonKom}>
            <div
              className={basket.cardButton}
              onClick={() => {
                navigate(`/${currentLang}/basket`);
                onClose();
              }}
            >
              View Cart
            </div>
            <div className={basket.cardButtonTwo}>Checkout</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketOverlay;
