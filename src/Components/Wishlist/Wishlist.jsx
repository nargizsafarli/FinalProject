import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/features/auth/wishlistSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import wish from "./Wishlist.module.css"; // öz stilin
import ModalProduct from "../ModalProduct/ModalProduct";
import { FaTrash } from "react-icons/fa6";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className={wish.wishlistWrapper}>
      {wishlistItems.length === 0 ? (
        <p>Wishlist boşdur</p>
      ) : (
        <div className={wish.productsGrid}>
          {wishlistItems.map((product) => (
            <div key={product.id} className={wish.card}>
              <div className={wish.imgWrapper}>
                <img src={product.img} alt={product.name} />
                <FaTrash
                  icon={faTimes}
                  className={wish.deleteIcon}
                  onClick={() => dispatch(removeFromWishlist(product.id))}
                />
              </div>
              <div className={wish.productInfo}>
                <p className={wish.name}>{product.nameEn}</p>
                <p>{product.smallDisPrice || product.smallPrice}$</p>
              </div>
              <button className={wish.button}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              >
                Add to Basket
              </button>
              <ModalProduct
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
