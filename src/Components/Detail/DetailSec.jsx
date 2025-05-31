import React, { useState, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../../redux/features/auth/productSlice";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LuChartNoAxesColumn } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa";
import paymentCard from "./assets/trust_badge.png"
import det from "./Detail.module.css"
function DetailSec() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.product);
  // useEffect ilə data-nı refresh olanda da gətir
  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, data.length]);

const product = data.find((item) => item.id === Number(id));



const [selectedImage, setSelectedImage] = useState("");
const [imageGallery, setImageGallery] = useState([]);
useEffect(() => {
  if (product) {
    setSelectedImage(product.img);
    setImageGallery([product.thumnailImg, product.img]); // "thumbnail" yazılıbsa Supabase-də
  }
}, [product]);

if (loading) return <p>Yüklənir...</p>;
if (error) return <p>Xəta baş verdi</p>;
if (!product) return <p>Məhsul tapılmadı</p>; // HOOK-lardan qabaq çıx!

  return (
    <div className={det.container}>
      {/* <div className={det.img}>
        <img src={product.img}/>
      </div> */}
      {/* <div className={det.gallery}>
  {imageGallery.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`img-${index}`}
      onClick={() => setSelectedImage(img)}
      className={`${det.thumb} ${selectedImage === img ? det.active : ""}`}
    />
  ))}
</div> */}
<div className={det.imageSection}>
  <div className={det.gallery}>
    {imageGallery.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`img-${index}`}
        onClick={() => setSelectedImage(img)}
        className={`${det.thumb} ${selectedImage === img ? det.active : ""}`}
      />
    ))}
  </div>
  <div className={det.img}>
    {selectedImage && (
      <Zoom>
        <img src={selectedImage} alt="Selected" />
      </Zoom>
    )}
  </div>
</div>

<div className={det.img}>
{selectedImage && (
  <Zoom>
    <img src={selectedImage} alt="Selected" />
  </Zoom>
)}
</div>
      <div className={det.DetailCon}>
        <h2>Name:{product.nameEn}</h2>
        <p>Description:{product.descriptionEn}</p> 
        <hr />
        <div className={det.info}>
        <p>Rating:{product.rating}</p>
        <p>Material:{product.materialEn}</p>
        <p>Condition:{product.conditionEn}</p>
         <p>Size:</p>
         <p>Est. Delivery Time 2-3 Days</p>
        </div>
         <button className={det.button}>ADD TO CARD</button>
        <div className={det.infItem}>
         <div className={det.icon}>
          <div><FontAwesomeIcon icon={faHeart} />Add To Wishlist</div>
          <div><LuChartNoAxesColumn />Add to Compare List</div>
          </div> 
          <div>In Stock</div>
          <div className={det.social}>
            <div><FaFacebookF /></div>
            <div><FaXTwitter /></div>
            <div><FaPinterestP /></div>
          </div>
          <div>
            <p>Guarantee Safe Checkout</p>
            <img src={paymentCard}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailSec;
