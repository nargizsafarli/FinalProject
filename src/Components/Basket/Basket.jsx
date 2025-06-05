import React, { useEffect } from 'react'
import basket from "./Basket.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotal, decreaseQuantity, increaseQuantity, removeFromBasket } from '../../redux/features/auth/basketSlice';
import { FaTrash } from "react-icons/fa6";

function Basket() {
    const dispatch=useDispatch()
    const {items,total}=useSelector((state)=>state.basket);
    useEffect(()=>{
        dispatch(calculateTotal())
    },[items,dispatch])

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
            <div
              key={`${id}-${size}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <img
                  src={product.img}
                  alt={product.nameEn}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <h4>{product.nameEn}</h4>
                  <p>Size: {size}</p>
                  <p style={{ margin: 0, fontWeight: "bold", color: "green" }}>
                    {unitPrice.toFixed(2)}$
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => dispatch(decreaseQuantity({ id, size }))}
                  disabled={quantity === 1}
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={quantity}
                  style={{ width: "40px", textAlign: "center" }}
                />
                <button onClick={() => dispatch(increaseQuantity({ id, size }))}>
                  +
                </button>
              </div>

              <div style={{ fontWeight: "bold", color: "#1890ff" }}>
                {(unitPrice * quantity).toFixed(2)}$
              </div>

              <div>
                <FaTrash
                  onClick={() => dispatch(removeFromBasket({ id, size }))}
                  style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
                />
              </div>
            </div>
          );
        })
      )}

      {items.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "right", fontSize: "18px" }}>
          <strong>Total: {total.toFixed(2)}$</strong>
        </div>
      )}
        </div>
        <div className={basket.right}></div>
    </div>
  )
}

export default Basket