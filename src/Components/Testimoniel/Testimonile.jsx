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
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { useTranslation } from "react-i18next";
function Testimonial() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const {t}=useTranslation()

  return (
    <div className={test.container}>
      <div className={test.header}>
        <div className={test.navWrapper}>
          <div ref={prevRef} className={test.prev}><GrFormPrevious /></div>
          <div ref={nextRef} className={test.next}><MdNavigateNext /></div>
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
             {t("test.p1")}
            </p>
            <div className={test.user}>
              <img src={imgLogo1} alt="user1" className={test.image} />
              <h4>Joe Toy</h4>
              <span>{t("test.about")}</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={test.card}>
            <p className={test.message}>
             {t("test.p1")}
          
            </p>
            <div className={test.user}>
              <img src={imgLogo2} alt="user2" className={test.image}/>
              <h4>Jason Mack</h4>
              <span>{t("test.about2")}</span>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={test.card}>
            <p className={test.message}>
             {t("test.p3")}
            </p>
            <div className={test.user}>
              <img src={imgLogo3} alt="user3" className={test.image}/>
              <h4>Amy Blane</h4>
              <span>{t("test.about2")}</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Testimonial;
