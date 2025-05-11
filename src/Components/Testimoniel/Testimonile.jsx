import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import test from "./Testimoniel.module.css";
import imgLogo1 from "./assets/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.avif"
import imgLogo2 from "./assets/download (2).jpeg"
import imgLogo3 from "./assets/download.jpeg"

function Testimonial() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className={test.container}>
      <div className={test.header}>
        <h2 className={test.title}>Testimonial</h2>
        <div className={test.navWrapper}>
          <div ref={prevRef} className={test.prev}>‹</div>
          <div ref={nextRef} className={test.next}>›</div>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        <SwiperSlide>
          <div className={test.card}>
            <p className={test.message}>
              Saved our business! We have no regrets! Thanks for the great service.
            </p>
            <div className={test.user}>
              <img src={imgLogo1} alt="user1" className={test.image} />
              <h4>DESTINEE</h4>
              <span>Marketing Personal</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={test.card}>
            <p className={test.message}>
              Great platform. My work productivity has doubled!
            </p>
            <div className={test.user}>
              <img src={imgLogo2} alt="user2" className={test.image}/>
              <h4>JASON</h4>
              <span>Developer</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={test.card}>
            <p className={test.message}>
              Amazing experience and great support. Definitely recommend it!
            </p>
            <div className={test.user}>
              <img src={imgLogo3} alt="user3" className={test.image}/>
              <h4>AMY</h4>
              <span>UI Designer</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Testimonial;
