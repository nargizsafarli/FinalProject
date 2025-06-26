import React, { useEffect, useState } from "react";
import basket from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  clearPromoCode,
  decreaseQuantity,
  increaseQuantity,
  removeFromBasket,
  setPromoCode,
} from "../../redux/features/auth/basketSlice";
import { FaTrash } from "react-icons/fa6";
import { getPrices } from "../../Utils/getprice";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n/i18next";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function Basket() {
  const currentLang = i18n.language;
  const {t}=useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, discountPercent, promoCode } = useSelector(
    (state) => state.basket
  );
  const discountedTotal = total - (total * discountPercent) / 100;
  const [promoInput, setPromoInput] = useState(promoCode || "");

  useEffect(() => {
    dispatch(calculateTotal());
  }, [items, dispatch]);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (code === "SUMMER15") {
      dispatch(setPromoCode({ code: "SUMMER15", percent: 15 }));
      Swal.fire({
        icon: "success",
        title: "Promo applied!",
        text: "You received 15% discount.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      dispatch(clearPromoCode());
      setPromoInput("");
      Swal.fire({
        icon: "error",
        title: "Invalid code",
        text: "Please enter a valid promo code.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleRemovePromo = () => {
    dispatch(clearPromoCode());
    setPromoInput("");
    Swal.fire({
      icon: "info",
      title: "Promo removed",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const savedFromProducts = items.reduce((acc, item) => {
    const { original, discount } = getPrices(item.product, item.size);
    if (!discount) return acc;
    return acc + (original - discount) * item.quantity;
  }, 0);

  const savedFromPromo = (total * discountPercent) / 100;
  const totalSaved = savedFromProducts + savedFromPromo;

  return (
    <div className={basket.container}>
      <div className={basket.left}>
        {items.length === 0 ? (
          <p className={basket.empty}>{t("product.empty")}</p>
        ) : (
          items.map((item) => {
            const { id, size, quantity, product } = item;
            const { original, discount } = getPrices(product, size);
            const unitPrice = discount || original;

            return (
              <div key={`${product.id}-${size}`}>
                <div className={basket.containerItem}>
                  <div className={basket.hrInf}>
                    <div className={basket.inf}>
                      <img
                        src={product.img}
                        alt={product.nameEn}
                        className={basket.img}
                      />
                      <div className={basket.infItem}>
                        <h4 className={basket.name}>
                           {
                    
                      currentLang === "az" ? product.nameAz : product.nameEn
                    }
                        </h4>
                        <p>
                          {t("product.size")}{" "}
                          <span className={basket.sizeSpan}>{size}</span>
                        </p>
                        {discount ? (
                          <p>
                            <span className={basket.pPrice}>
                              {original.toFixed(2)}$
                            </span>
                            <span className={basket.oPrice}>
                              {discount.toFixed(2)}$
                            </span>
                          </p>
                        ) : (
                          <p className={basket.oPrice}>
                            {original.toFixed(2)}$
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <div className={basket.sizeDiv}> */}
                  <div className={basket.quantity}>
                    <div className={basket.quan}>
                      <div className={basket.quanItem}>{quantity}</div>
                    </div>
                    <div className={basket.quanBtn}>
                      <div
                        className={basket.btn}
                        onClick={() => dispatch(decreaseQuantity({ id, size }))}
                      >
                        -
                      </div>
                      <div
                        className={basket.btn}
                        onClick={() => dispatch(increaseQuantity({ id, size }))}
                      >
                        +
                      </div>
                    </div>
                  </div>

                  <div className={basket.price}>
                    ${(unitPrice * quantity).toFixed(2)}
                  </div>

                  <FaTrash
                    className={basket.icon}
                    onClick={() => dispatch(removeFromBasket({ id, size }))}
                  />
                  {/* </div> */}

                </div>
                <hr className={basket.hr} />
              </div>
            );
          })
        )}
      </div>

      {items.length > 0 && (
        <div className={basket.right}>
          <div className={basket.rightCard}>
            <div className={basket.tot}>
              <div className={basket.summary}>
                <div className={basket.summaryRow}>
                  <p className={basket.items}>
                    {items.reduce((acc, item) => acc + item.quantity, 0)} {t("product.item")}
                  </p>
                  <p className={basket.Tott}>
                    $
                    {items
                      .reduce((acc, item) => {
                        const { original } = getPrices(item.product, item.size);
                        return acc + original * item.quantity;
                      }, 0)
                      .toFixed(2)}
                  </p>
                </div>

                <div className={basket.summaryRow}>
                  <p className={basket.items}>{t("product.saved")}</p>
                  <p className={basket.Tott}>-${totalSaved.toFixed(2)}</p>
                </div>
              </div>

              <hr className={basket.hrr} />
              <div className={basket.total}>
                <p className={basket.items}>{t("product.total")}</p>
                <p>
                  {discountPercent > 0 ? (
                    <>
                      <span
                      className={basket.lineTh}
                      >
                        ${total.toFixed(2)}
                      </span>
                      <span className={basket.Tott}>
                        ${discountedTotal.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <p className={basket.Tott}>${total.toFixed(2)}</p>
                  )}
                </p>
              </div>

              <span className={basket.promHave}>{t("product.promo")}</span>
              <hr className={basket.hrr} />
            </div>

            <div className={basket.promo}>
              <div className={basket.prom}>
                <div className={basket.promoItem}>
                  <input
                    type="text"
                    placeholder="Promo code"
                    className={basket.input}
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  {promoCode ? (
                    <div className={basket.add} onClick={handleRemovePromo}>
                    {t("product.remove")}
                    </div>
                  ) : (
                    <div className={basket.add} onClick={handleApplyPromo}>
                      {t("product.add")}
                    </div>
                  )}
                </div>
                <div className={basket.texting}>
                 {t("product.text")} <span className={basket.sumfif}>"{t("product.text2")}"</span>{t("product.text3")}
                </div>
              </div>

              <div
                className={basket.checkBtn}
                onClick={() => {
                  navigate(`/${currentLang}/check`);
                }}
              >
                {t("product.proces")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Basket;
