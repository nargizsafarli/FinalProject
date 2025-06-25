import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import sliderImg1 from "./assets/slider9.webp";
import sliderImg2 from "./assets/slideshow-v1-1.webp";
import sliderImg3 from "./assets/slider4.webp";
import slide from "./NavSlider.module.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/i18next";
import { useNavigate } from "react-router-dom";


function NavSlider() {
  const { t } = useTranslation();
  const currentLang=i18n.language
  const navigate=useNavigate()
  return (
    <div className={slide.sliderWrapper}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        loop={true}
        className={slide.slider}
      >
        <SwiperSlide>
          <div
            className={slide.slide}
            style={{ backgroundImage: `url(${sliderImg1})` }}
          >
            <div className={slide.content}>
              <h2> {t("nav-slider.firstH")}</h2>
              <p>
                 {t("nav-slider.firstP")}
              </p>
              <div className={slide.sliButton} onClick={()=>navigate(`/${currentLang}/shop`)}> {t("nav-slider.Btn")}</div>
            </div>
            
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className={slide.slide}
            style={{ backgroundImage: `url(${sliderImg2})` }}
          >
            <div className={slide.content}>
              <h2>{t("nav-slider.secondH")}</h2>
              <p>
                {t("nav-slider.firstP")}
              </p>
              <div className={slide.sliButton} onClick={()=>navigate(`/${currentLang}/shop`)}>{t("nav-slider.Btn")}</div>
            </div>
              
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className={slide.slide}
            style={{ backgroundImage: `url(${sliderImg3})` }}
          >
            <div className={slide.content}>
              <h2>{t("nav-slider.thirdH")}</h2>
              <p>
                {t("nav-slider.firstP")}
              </p>
              <div className={slide.sliButton} onClick={()=>navigate(`/${currentLang}/shop`)}>{t("nav-slider.Btn")}</div>
            </div>
              
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default NavSlider;
