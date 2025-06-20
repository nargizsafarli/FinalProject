import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/features/auth/wishlistSlice";
import wish from "./Wishlist.module.css";
import ModalProduct from "../ModalProduct/ModalProduct";
import { FaTrash } from "react-icons/fa6";
import { notification } from "antd";


const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
   const [api, contextHolder] = notification.useNotification();
  const [selectedProduct, setSelectedProduct] = useState(null);
   const handleAddToBasket = (product) => {
  if (user) {
    setSelectedProduct(product);
    setIsModalOpen(true);
  } else {
     api.warning({
      message: 'Zəhmət olmasa daxil olun',
      description: 'Bu funksiyanı istifadə etmək üçün hesabınıza daxil olun.',
       showProgress: true,
      duration: 2,
      zIndex:9999
    });
  }
};

  const getBestPrice = (product) => {
    if (product.smallDisPrice || product.smallPrice) {
      return {
        original: product.smallPrice,
        discount: product.smallDisPrice,
      };
    }
    if (product.mediumDisPrice || product.mediumPrice) {
      return {
        original: product.mediumPrice,
        discount: product.mediumDisPrice,
      };
    }
    if (product.largeDisPrice || product.largePrice) {
      return {
        original: product.largePrice,
        discount: product.largeDisPrice,
      };
    }
    return { original: 0, discount: 0 };
  };

  return (
    <div className={wish.wishlistWrapper}>
      {contextHolder}
      {wishlistItems.length === 0 ? (
        <p>Wishlist boşdur</p>
      ) : (
        <div className={wish.productsGrid}>
          {wishlistItems.map((product) => {
            const { original, discount } = getBestPrice(product);

            return (
              <div key={product.id} className={wish.card}>
                <div className={wish.imgWrapper}>
                  <img src={product.img} alt={product.name} />
                  <FaTrash
                    className={wish.deleteIcon}
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                  />
                </div>
                <div className={wish.productInfo}>
                  <p className={wish.name}>{product.nameEn}</p>
                  {discount ? (
                    <p>
                      <span className={wish.prevPrice}>
                        ${original}
                      </span>{" "}
                      <span className={wish.orPrice}>${discount}</span>
                    </p>
                  ) : (
                    <p className={wish.orPrice}>${original}</p>
                  )}
                </div>
                <button
                  className={wish.button}
                  onClick={() => handleAddToBasket(product)}
                >
                  Add to Basket
                </button>
                <ModalProduct
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  product={selectedProduct}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


export default Wishlist;
