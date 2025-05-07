import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import test from "./Testimoniel.module.css";

function Testimonial() {
  return (
    <div className={test.container}>
      <div className={test.header}>
        <h2 className={test.title}>Testimonial</h2>
        <div className={test.navWrapper}>
          <div className="custom-prev">‹</div>
          <div className="custom-next">›</div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
      >
        {/* Slides... */}
      </Swiper>
    </div>
  );
}

export default Testimonial;
