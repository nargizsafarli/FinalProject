import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../../redux/features/auth/basketSlice";
import basket from "./BasketOver.module.css";
import { getPrices } from "../../Utils/getprice";
import i18n from "../../i18n/i18next";
import { useTranslation } from "react-i18next";

const BasketOverlay = ({ isOpen, onClose, currentLang }) => {
  const basketItems = useSelector((state) => state.basket.items);
  const total = useSelector((state) => state.basket.total);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  }, [basketItems, dispatch]);
  const {t}=useTranslation()
  // const currentLang=i18n.language

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
        <h2 className={basket.text}>{t("notif.shop")}</h2>
        <hr className={basket.hrr} />

        <div className={basket.basketItemsWrapper}>
          {basketItems.length === 0 ? (
            <p>{t("notif.bas")}</p>
          ) : (
            basketItems.map((item) => {
              const { original, discount } = getPrices(item.product, item.size);
              const price = discount || original;

              return (
                <div key={`${item.id}-${item.size}`} className={basket.basketItem}>
                  <div className={basket.card}>
                    <img src={item.product.img} alt={item.product.name} />
                    <div className={basket.cardBody}>
                      <p className={basket.name}>
                       {currentLang === "az" ? item.product.nameAz : item.product.nameEn}
                      </p>
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
            <span>{t("notif.tot")}</span>
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
             {t("notif.view")}
            </div>
            <div className={basket.cardButtonTwo}
             onClick={() => {
                navigate(`/${currentLang}/check`);
                onClose();
              }}
            >{t("notif.check")}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketOverlay;
