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



function Basket() {
    const currentLang = i18n.language;
   const navigate=useNavigate()
  const dispatch = useDispatch();
  const { items, total,discountPercent } = useSelector((state) => state.basket);
  const discountedTotal = total - (total * discountPercent) / 100;
  const [promoInput, setPromoInput] = useState("");

  useEffect(() => {
    dispatch(calculateTotal());
  }, [items, dispatch]);

  const handleApplyPromo = () => {
  if (promoInput.trim().toUpperCase() === "SUMMER15") {
    dispatch(setPromoCode({ code: "SUMMER15", percent: 15 }));
  } else {
    dispatch(clearPromoCode());
    alert("Invalid promo code");
  }
};




  return (
    <div className={basket.container}>
      <div className={basket.left}>
        {items.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          items.map((item) => {
            const { id, size, quantity, product } = item;
            const { original, discount } = getPrices(item.product, item.size);
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
                        <h4 className={basket.name}>{product.nameEn}</h4>
                        <p>
                          Size: <span className={basket.sizeSpan}>{size}</span>
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
                </div>
                <hr className={basket.hr} />
              </div>
            );
          })
        )}
      </div>

      <div className={basket.right}>
        <div className={basket.rightCard}>
          {items.length > 0 && (
            <div className={basket.tot}>
              <div className={basket.summary}>
                <div className={basket.summaryRow}>
                  <p>
                    {items.reduce((acc, item) => acc + item.quantity, 0)} items
                  </p>
                  <p>
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
                  <p>You saved</p>
                  <p>
                    -$
                    {items
                      .reduce((acc, item) => {
                        const { original, discount } = getPrices(
                          item.product,
                          item.size
                        );
                        if (!discount) return acc;
                        return acc + (original - discount) * item.quantity;
                      }, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
              <hr className={basket.hrr} />
              <div className={basket.total}>
                <p>Total:</p>
                <p>
                  {discountPercent > 0 ? (
                    <>
                      <span
                        style={{
                          textDecoration: "line-through",
                          marginRight: "8px",
                          color: "gray",
                        }}
                      >
                        ${total.toFixed(2)}
                      </span>
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ${discountedTotal.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>${total.toFixed(2)}</>
                  )}
                </p>
              </div>
              <span>Have a promocod?</span>
              <hr className={basket.hrr} />
            </div>
          )}

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
                <div className={basket.add} onClick={handleApplyPromo}>Add</div>
              </div>
              <div className={basket.texting}>
                Take our exclusive promo code
              </div>
            </div>
            <div className={basket.checkBtn} onClick={()=>{navigate(`/${currentLang}/check`)}}>Proceed to checkout</div>
          </div>
        </div>

        <div className={basket.rightPolicy}>salam</div>
      </div>
    </div>
  );
}

export default Basket;
