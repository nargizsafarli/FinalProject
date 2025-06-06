import React, { useEffect } from "react";
import basket from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateTotal,
  decreaseQuantity,
  increaseQuantity,
  removeFromBasket,
} from "../../redux/features/auth/basketSlice";
import { FaTrash } from "react-icons/fa6";

function Basket() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.basket);
  useEffect(() => {
    dispatch(calculateTotal());
  }, [items, dispatch]);

  return (
    <div className={basket.container}>
      <div className={basket.left}>
        {items.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          items.map((item) => {
            const { id, size, quantity, product } = item;

            let unitPrice =
              size === "small"
                ? product.smallDisPrice || product.smallPrice
                : size === "medium"
                ? product.mediumDisPrice || product.mediumPrice
                : product.largeDisPrice || product.largePrice;

            return (
              <div>
              <div key={product.id} className={basket.containerItem}>
              <div className={basket.hrInf}>
                <div className={basket.inf}>
                  <img
                    src={product.img}
                    alt={product.nameEn}
                    className={basket.img}
                  />
                  <div className={basket.infItem}>
                    <h4 className={basket.name}>{product.nameEn}</h4>
                    <p>Size: {size}</p>
                    <p>{unitPrice.toFixed(2)}$</p>
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
                      disabled={quantity === 1}
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
              <hr className={basket.hr}/>
              </div>
            );
          })
        )}
       
      </div>
      <div className={basket.right}>
        <div className={basket.rightCard}>
          {items.length > 0 && (
            <div className={basket.tot}>
              <div className={basket.total}>
                <p >Total:</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <span>Have a promocod?</span>
              <hr className={basket.hrr}/>
            </div>
            
          )}
          <div className={basket.promo}>
          <div className={basket.prom}>
            <div className={basket.promoItem}>
              <input type="text" placeholder="Promo code" className={basket.input} />
              <div className={basket.add}>Add</div>
            </div>
            <div className={basket.texting}>Take our ekculive promo code</div>
            </div>
            <div className={basket.checkBtn}>Proceed to checkout</div>
          </div>
        </div>
        <div className={basket.rightPolicy}>salam</div>
      </div>
    </div>
  );
}

export default Basket;
